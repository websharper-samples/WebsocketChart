# About
Through this WebSharper application you can experience how the client and the webserver communicates with each other using websocket protocoll.
When running the app you will see a line-chart that recieves new data from the server. This data is also logged on the left side (and are randomly generated).
![screenshot](/chartingsocket/media/screenshot.png)
After 50 generated data the chart starts shifting to avoid overloading.
___
# Running the appliaction

For deploying the application to see it running in the browser just click the button below.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://azuredeploy.net/repository=https://github.com/websharper-samples/WebsocketChart)

Or follow the instructions below after cloning this repository: 

Navigate to the `chartingsocket` folder and build the project with
```
dotnet build
```
When building is done you can run the app with
```
dotnet run
```
If everything is ok, you will see the following lines in your terminal:

![run](/chartingsocket/media/run.png)

Now you can `Ctrl+LeftClick` on the URL or write it into the browser manually. The app will be hosted on `localhost:5000`.
___
# The Client-Server communication
## Creating the chart
As I mentioned above, the server sends data to a chart implemented in the program. For this communication firstly, we have to create a chart. In this sample project we are using **ChartJS** for charting. [More about chartJS.](https://www.chartjs.org/docs/3.4.1/)

About using **chartJS** in F# with **WebSharper** you can read [here](https://github.com/dotnet-websharper/chartjs).

When using **ChartJS** we have two options, `static` and `live` charts.
Chart Type | Behavior
-----------|---------
Static | shows a non-changing set of data
Live | depends on streams

Logically we need a **live chart** in this project, what we will create in `Website.fs`.
Before defining the chart we need to include `WebSharper.Charting` with the following line of code:
```fs
open WebSharper.Charting
```
### Defining the stream
As I said before, a **data stream** is required for live charts as an *always-changing dataset*. The next line will generate it for us:
```fs
    let dataStream = Event<string * float>()
```
Here you can see two types in the event constructor. A string for the name of the current record and a float for the value of it.
### Defining the chart
After the stream we can create our chart by defining a **linechart** with it's attributes, that are the following:
```fs
    let chart =
        LiveChart.Line(dataStream.Publish)
            .WithTitle("Generated data")
            .WithFillColor(Color.Rgba(255, 183, 100, 0.4))
            .WithPointColor(Color.Rgba(255, 61, 0, 1.0))
            .WithStrokeColor(Color.Rgba(255, 114, 0, 0.8))
``` 
In the chart constructor we need to pass our dataset (the stream). This is how we inform the chart about its data. The other attributes here are trivial, but if something is not clear either, just visit on [GitHub](https://github.com/dotnet-websharper/charting).
### Make the chart visible
Now we have a **live chart**. To make it visible in the application we have to create place for it in the html. As we are working on a ws project, we can create ws attributes in the **html**, like below:
```html
<div ws-replace="Chart"></div>
```
After that we can refere to it and replace it in `Website.fs` according to the next lines written in the `Main` definition in `Client  ` module:
```fs
.Chart(div[
        attr.id "myChart"
    ][
        Renderers.ChartJs.Render(chart, Size = Size(1000, 700), Window = 50)
    ])
    .Doc()
```
This is how we replace a **DOM element** in our html. After `.Chart` (the name of the ws attribute) we declare the tag of the new DOM element. In the first square bracket we can add attributes to the element as `style`, `class` or `id` as well. In the second bracket we can tell the program what to display. For displaying a chart we need to call the `Renderers.ChartJs.Render` method with the chart as a parameter. We can define its size and other parameters too, like below.
___
## Solving the communication
When we are done with the chart we can start working on the communication. For this task we have to write code mainly in `WebSocketClient.fs` and `WebSocketServer.fs`.
### Server-side
Since we need to send the new data from the server, start with **server-side**.

We have to expand the `S2CMessage` type with **NewData**. As you can figure it out, this will be the type of the data we want to send to the client.
As far as `C2SMessage` is a discriminant union we will write the followings to it:
```fs
    | [<Name "int">] NewData of value: int
```
Now we can handle the new data. Let's generate it!

In the `Start()` method we have to run a loop asynchronously to get new data with a small rest between them and send them to client with `client.PostAsync`. In the `sender` definition we need the following code:
```fs
async { 
    while true do
        do! Async.Sleep 1000
        do! client.PostAsync (NewData (System.Random().Next(1, 21)))
}
```
This will generate new data between **1** and **20** in every seconds (1000 milliseconds).
### Client-side
To update the charts database we have to call `stream.Trigger()`. This method requires a string (for **x axis**) and a float (for **y axis**) as we defined that [here](#Defining-the-stream).

We will call the mentioned method after matching the message with our new `S2CMessage` option like below:
```fs
let! server =
    ConnectStateful endpoint <| fun server -> async {
        return 0, fun state msg -> async {
            match msg with
            | Message data ->
                match data with
                | Server.NewData x ->
                    stream.Trigger(string state, float x)
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
```
The relevant section here is the following:
```fs
| Server.NewData x ->
    stream.Trigger(string state, float x)
    writen "New data generated: %i" x
    return (state + 1)
```
We trigger the stream with the new data (**x**), that has been sent as a message from the server. `State` is a counter for the data amount. 
After updating the chart we are just simply logging the new data to the left side of the application. The `writen` method takes care of it in the code above.
___
## If you have any questions about this project, just write an [issue](https://github.com/websharper-samples/WebsocketChart/issues) or contact the [author](https://github.com/steiner2001). **Happy coding!**
___