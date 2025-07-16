namespace WebSocketChart


open System
open System.Threading.Tasks
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open WebSharper.AspNetCore        
open WebSharper.AspNetCore.WebSocket

type Startup() =

    member this.ConfigureServices(services: IServiceCollection) =
        services.AddWebSharper()
                .AddAuthentication("WebSharper")
                .AddCookie("WebSharper", fun options -> ())
        |> ignore

    member this.Configure(app: IApplicationBuilder, env: IWebHostEnvironment, cfg: IConfiguration) =
        if env.IsDevelopment() then app.UseDeveloperExceptionPage() |> ignore

        app.UseAuthentication()
            .UseWebSockets()
            .UseWebSharper(fun ws ->
                let logger = app.ApplicationServices.GetService<ILogger<Website.MyWebsite>>()
                ws
                    .Sitelet(Website.MyWebsite(logger).Sitelet)
                    .UseWebSocket("ws", fun wsws -> 
                    wsws.Use(WebSocketChart.Server.Start())
                    |> ignore
                )
                |> ignore
            )
            .UseStaticFiles()
            .Run(fun context ->
                context.Response.StatusCode <- 404
                context.Response.WriteAsync("Fell through :("))
