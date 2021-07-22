(function(Global)
{
 "use strict";
 var WebSocketChart,Client,Website,SomeRecord,Client$1,SC$1,chartingsocket_JsonDecoder,chartingsocket_JsonEncoder,chartingsocket_Templates,WebSharper,UI,Doc,Concurrency,AspNetCore,WebSocket,Client$2,WithEncoding,JSON,AttrProxy,Charting,Renderers,ChartJs,Templating,Runtime,Server,ProviderBuilder,Handler,TemplateInstance,List,Seq,Operators,Control,FSharpEvent,LiveChart,Pervasives,ClientSideJson,Provider,Client$3,Templates;
 WebSocketChart=Global.WebSocketChart=Global.WebSocketChart||{};
 Client=WebSocketChart.Client=WebSocketChart.Client||{};
 Website=WebSocketChart.Website=WebSocketChart.Website||{};
 SomeRecord=Website.SomeRecord=Website.SomeRecord||{};
 Client$1=Website.Client=Website.Client||{};
 SC$1=Global.StartupCode$chartingsocket$Website=Global.StartupCode$chartingsocket$Website||{};
 chartingsocket_JsonDecoder=Global.chartingsocket_JsonDecoder=Global.chartingsocket_JsonDecoder||{};
 chartingsocket_JsonEncoder=Global.chartingsocket_JsonEncoder=Global.chartingsocket_JsonEncoder||{};
 chartingsocket_Templates=Global.chartingsocket_Templates=Global.chartingsocket_Templates||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 AspNetCore=WebSharper&&WebSharper.AspNetCore;
 WebSocket=AspNetCore&&AspNetCore.WebSocket;
 Client$2=WebSocket&&WebSocket.Client;
 WithEncoding=Client$2&&Client$2.WithEncoding;
 JSON=Global.JSON;
 AttrProxy=UI&&UI.AttrProxy;
 Charting=WebSharper&&WebSharper.Charting;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 Templating=UI&&UI.Templating;
 Runtime=Templating&&Templating.Runtime;
 Server=Runtime&&Runtime.Server;
 ProviderBuilder=Server&&Server.ProviderBuilder;
 Handler=Server&&Server.Handler;
 TemplateInstance=Server&&Server.TemplateInstance;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 Operators=WebSharper&&WebSharper.Operators;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 LiveChart=Charting&&Charting.LiveChart;
 Pervasives=Charting&&Charting.Pervasives;
 ClientSideJson=WebSharper&&WebSharper.ClientSideJson;
 Provider=ClientSideJson&&ClientSideJson.Provider;
 Client$3=UI&&UI.Client;
 Templates=Client$3&&Client$3.Templates;
 Client.WebSocketTest=function(endpoint,stream)
 {
  var container,b;
  function writen(fmt)
  {
   return fmt(function(s)
   {
    var x;
    x=self.document.createTextNode(s+"\n");
    container.elt.appendChild(x);
   });
  }
  container=Doc.Element("pre",[],[]);
  Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   return Concurrency.Bind(WithEncoding.ConnectStateful(function(a)
   {
    return JSON.stringify((chartingsocket_JsonEncoder.j())(a));
   },function(a)
   {
    return(chartingsocket_JsonDecoder.j())(JSON.parse(a));
   },endpoint,function()
   {
    var b$1;
    b$1=null;
    return Concurrency.Delay(function()
    {
     return Concurrency.Return([0,function(state)
     {
      return function(msg)
      {
       var b$2;
       b$2=null;
       return Concurrency.Delay(function()
       {
        var data,x;
        return msg.$==3?(writen(function($1)
        {
         return $1("WebSocket connection closed.");
        }),Concurrency.Return(state)):msg.$==2?(writen(function($1)
        {
         return $1("WebSocket connection open.");
        }),writen(function($1)
        {
         return $1("Generating new data..");
        }),Concurrency.Return(state)):msg.$==1?(writen(function($1)
        {
         return $1("WebSocket connection error!");
        }),Concurrency.Return(state)):(data=msg.$0,data.$==1?(writen(function($1)
        {
         return $1("WebSocket connection error!");
        }),Concurrency.Return(state)):(x=data.$0,(stream.event.Trigger([Global.String(x),x*x]),Concurrency.Return(state+1))));
       });
      };
     }]);
    });
   }),function()
   {
    return Concurrency.Zero();
   });
  })),null);
  return container;
 };
 SomeRecord.New=function(Name)
 {
  return{
   Name:Name
  };
 };
 Client$1.Main=function(wsep)
 {
  var b,C,_this,W,_this$1,p,i;
  return(b=(C=Doc.Element("div",[AttrProxy.Create("id","myChart")],[ChartJs.Render$8(Client$1.chart(),{
   $:1,
   $0:{
    $:0,
    $0:500,
    $1:350
   }
  },null,null)]),(_this=(W=Client.WebSocketTest(wsep,Client$1.dataStream()),(_this$1=new ProviderBuilder.New$1(),(_this$1.h.push({
   $:0,
   $0:"websockettest",
   $1:W
  }),_this$1))),(_this.h.push({
   $:0,
   $0:"chart",
   $1:C
  }),_this))),(p=Handler.CompleteHoles(b.k,b.h,[]),(i=new TemplateInstance.New(p[1],chartingsocket_Templates.body(p[0])),b.i=i,i))).get_Doc();
 };
 Client$1.chart=function()
 {
  SC$1.$cctor();
  return SC$1.chart;
 };
 Client$1.dataStream=function()
 {
  SC$1.$cctor();
  return SC$1.dataStream;
 };
 Client$1.data=function()
 {
  SC$1.$cctor();
  return SC$1.data;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.data=List.ofSeq(Seq.delay(function()
  {
   return Seq.map(function(x)
   {
    return[Global.String(x),x*x];
   },Operators.range(1,20));
  }));
  SC$1.dataStream=new FSharpEvent.New();
  List.iter(function(a)
  {
   Client$1.dataStream().event.Trigger(a);
  },Client$1.data());
  SC$1.chart=LiveChart.Line$1(Client$1.dataStream().event).__WithTitle("LiveChart example").__WithFillColor(new Pervasives.Color({
   $:0,
   $0:255,
   $1:183,
   $2:100,
   $3:0.4
  })).__WithPointColor(new Pervasives.Color({
   $:0,
   $0:255,
   $1:61,
   $2:0,
   $3:1
  })).__WithStrokeColor(new Pervasives.Color({
   $:0,
   $0:255,
   $1:114,
   $2:0,
   $3:0.8
  }));
 };
 chartingsocket_JsonDecoder.j=function()
 {
  return chartingsocket_JsonDecoder._v?chartingsocket_JsonDecoder._v:chartingsocket_JsonDecoder._v=(Provider.DecodeUnion(void 0,"type",[["int",[["$0","value",Provider.Id(),0]]],["string",[["$0","value",Provider.Id(),0]]]]))();
 };
 chartingsocket_JsonEncoder.j=function()
 {
  return chartingsocket_JsonEncoder._v?chartingsocket_JsonEncoder._v:chartingsocket_JsonEncoder._v=(Provider.EncodeUnion(void 0,{
   str:0
  },[["Request",[["$0","str",Provider.Id(),0]]]]))();
 };
 chartingsocket_Templates.body=function(h)
 {
  Templates.LoadLocalTemplates("main");
  return h?Templates.NamedTemplate("main",{
   $:1,
   $0:"body"
  },h):void 0;
 };
}(self));
