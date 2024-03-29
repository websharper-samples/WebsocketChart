﻿// $begin{copyright}
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
module WebSocketChart.Server

open WebSharper
open WebSharper.AspNetCore.WebSocket.Server

type [<JavaScript; NamedUnionCases>]
    C2SMessage =
    | Request of str: string

and [<JavaScript; NamedUnionCases "type">]
    S2CMessage =
    | [<Name "int">] NewData of value: int
    | [<Name "string">] ErrorResponse of value: string

let Start() : StatefulAgent<S2CMessage, C2SMessage, int> =
    /// print to debug output and stdout
    let dprintfn x =
        Printf.ksprintf (fun s ->
            System.Diagnostics.Debug.WriteLine s
            stdout.WriteLine s
        ) x

    fun client -> async {
        let clientIp = client.Connection.Context.Connection.RemoteIpAddress.ToString()
        let sender =
            async { 
                while true do
                    do! Async.Sleep 1000
                    do! client.PostAsync (NewData (System.Random().Next(1, 21)))
            }

        sender 
        |> Async.Start
        return 0, fun state msg -> async {
            dprintfn "Received message #%i from %s" state clientIp
            match msg with
            | Error exn -> 
                eprintfn "Error in WebSocket server connected to %s: %s" clientIp exn.Message
                do! client.PostAsync (ErrorResponse ("Error: " + exn.Message))
                return state
            | Close ->
                dprintfn "Closed connection to %s" clientIp
                return state
            | _ ->
                dprintfn "Websocket error"
                return state
        }
    }
