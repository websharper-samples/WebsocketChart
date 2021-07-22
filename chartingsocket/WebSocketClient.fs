// $begin{copyright}
//
// This file is part of WebSharper
//
// Copyright (c) 2008-2020 IntelliFactory
//
// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License.  You may
// obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied.  See the License for the specific language governing
// permissions and limitations under the License.
//
// $end{copyright}
module WebSocketChart.Client

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Html
open WebSharper.UI.Client
open WebSharper.AspNetCore.WebSocket
open WebSharper.AspNetCore.WebSocket.Client


[<JavaScript>]
let WebSocketTest (endpoint : WebSocketEndpoint<Server.S2CMessage, Server.C2SMessage>) (stream: Event<string * float>) =
    let container = Elt.pre [] []
    let writen fmt =
        Printf.ksprintf (fun s ->
            JS.Document.CreateTextNode(s + "\n")
            |> container.Dom.AppendChild
            |> ignore
        ) fmt
    async {

        let! server =
            ConnectStateful endpoint <| fun server -> async {
                return 0, fun state msg -> async {
                    match msg with
                    | Message data ->
                        match data with
                        | Server.NewData x ->
                            stream.Trigger(string x, float x)
                            writen "New data generated: %i" x
                            return (state + 1)
                        | Server.ErrorResponse x ->
                            writen "WebSocket connection error!"
                            return state
                    | Close ->
                        writen "WebSocket connection closed."
                        return state
                    | Open ->
                        writen "WebSocket connection open."
                        writen "Generating new data.."
                        return state
                    | Error ->
                        writen "WebSocket connection error!"
                        return state
                }
            }
        ()
    }
    |> Async.Start

    container

let MyEndPoint (url: string) : WebSocketEndpoint<Server.S2CMessage, Server.C2SMessage> = 
    WebSocketEndpoint.Create(url, "/ws", JsonEncoding.Readable)