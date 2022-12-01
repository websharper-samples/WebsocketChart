// $begin{copyright}
//
// This file is part of WebSharper
//
// Copyright (c) 2008-2018 IntelliFactory
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
module WebSocketChart.Website

open Microsoft.Extensions.Logging
open WebSharper
open WebSharper.AspNetCore
open WebSharper.JavaScript
open WebSharper.Sitelets
open WebSharper.UI
open WebSharper.UI.Html
open WebSharper.UI.Templating
open WebSharper.Charting
open type WebSharper.UI.ClientServer

type IndexTemplate = Template<"Main.html", clientLoad = ClientLoad.FromDocument>

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About

[<JavaScript>]
module Client =
    open WebSharper.UI.Client

    let dataStream = Event<string * float>()
    let chart =
        LiveChart.Line(dataStream.Publish)
            .WithTitle("Generated data")
            .WithFillColor(Color.Rgba(255, 183, 100, 0.4))
            .WithPointColor(Color.Rgba(255, 61, 0, 1.0))
            .WithStrokeColor(Color.Rgba(255, 114, 0, 0.8))

    let Main wsep =
        IndexTemplate.Body()
            .WebSocketTest(WebSocketChart.Client.WebSocketTest wsep dataStream)
            .Chart(
                div [
                    attr.id "myChart"
                ] [
                    Renderers.ChartJs.Render(chart, Size = Size(1000, 700), Window = 50)
                ]
            )
            .Doc()

open WebSharper.UI.Server

type MyWebsite(logger: ILogger<MyWebsite>) =
    inherit SiteletService<EndPoint>()

    override this.Sitelet = Application.MultiPage(fun (ctx: Context<_>) (ep: EndPoint) ->
        let readBody() =
            let i = ctx.Request.Body 
            if not (isNull i) then 
                // We need to copy the stream because else StreamReader would close it.
                use m =
                    if i.CanSeek then
                        new System.IO.MemoryStream(int i.Length)
                    else
                        new System.IO.MemoryStream()
                i.CopyTo m
                if i.CanSeek then
                    i.Seek(0L, System.IO.SeekOrigin.Begin) |> ignore
                m.Seek(0L, System.IO.SeekOrigin.Begin) |> ignore
                use reader = new System.IO.StreamReader(m)
                reader.ReadToEnd()
            else "Request body not found"
        logger.LogInformation("Serving {0}", ep)
        match ep with
        | Home ->
            let wsep = Client.MyEndPoint (ctx.RequestUri.ToString())
            IndexTemplate()
                .Main(client (Client.Main wsep))
                .Doc()
            |> Content.Page
        | About ->
            Content.Text "Through this WebSharper application you can experience how the client and the webserver communicates with each other using websocket protocoll.
When running the app you will see a line-chart that recieves new data from the server. This data is also logged on the left side (and are randomly generated). Read more about this project on https://github.com/websharper-samples/WebsocketChart"
    )
