(function(Global)
{
 "use strict";
 var WebSharper,Charting,Pervasives,Color,Seq,Reactive,Charts,DataType,ChartConfig,SeriesChartConfig,ColorConfig,PolarData,Obj,LineChart,BarChart,RadarChart,PolarAreaChart,PieChart,DoughnutChart,CompositeChart,Chart,LiveChart,SC$1,Renderers,ChartJsInternal,BatchUpdater,ChartJs,SC$2,IntelliFactory,Runtime,Seq$1,List,Reactive$1,Reactive$2,Util,Control,FSharpEvent,Random,Arrays,Chart$1,Operators,Option,Slice,UI,Doc,AttrProxy,AttrModule;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Charting=WebSharper.Charting=WebSharper.Charting||{};
 Pervasives=Charting.Pervasives=Charting.Pervasives||{};
 Color=Pervasives.Color=Pervasives.Color||{};
 Seq=Pervasives.Seq=Pervasives.Seq||{};
 Reactive=Pervasives.Reactive=Pervasives.Reactive||{};
 Charts=Charting.Charts=Charting.Charts||{};
 DataType=Charts.DataType=Charts.DataType||{};
 ChartConfig=Charts.ChartConfig=Charts.ChartConfig||{};
 SeriesChartConfig=Charts.SeriesChartConfig=Charts.SeriesChartConfig||{};
 ColorConfig=Charts.ColorConfig=Charts.ColorConfig||{};
 PolarData=Charts.PolarData=Charts.PolarData||{};
 Obj=WebSharper&&WebSharper.Obj;
 LineChart=Charts.LineChart=Charts.LineChart||{};
 BarChart=Charts.BarChart=Charts.BarChart||{};
 RadarChart=Charts.RadarChart=Charts.RadarChart||{};
 PolarAreaChart=Charts.PolarAreaChart=Charts.PolarAreaChart||{};
 PieChart=Charts.PieChart=Charts.PieChart||{};
 DoughnutChart=Charts.DoughnutChart=Charts.DoughnutChart||{};
 CompositeChart=Charts.CompositeChart=Charts.CompositeChart||{};
 Chart=Charting.Chart=Charting.Chart||{};
 LiveChart=Charting.LiveChart=Charting.LiveChart||{};
 SC$1=Global.StartupCode$WebSharper_Charting$Charts=Global.StartupCode$WebSharper_Charting$Charts||{};
 Renderers=Charting.Renderers=Charting.Renderers||{};
 ChartJsInternal=Renderers.ChartJsInternal=Renderers.ChartJsInternal||{};
 BatchUpdater=ChartJsInternal.BatchUpdater=ChartJsInternal.BatchUpdater||{};
 ChartJs=Renderers.ChartJs=Renderers.ChartJs||{};
 SC$2=Global.StartupCode$WebSharper_Charting$Renderers=Global.StartupCode$WebSharper_Charting$Renderers||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Seq$1=WebSharper&&WebSharper.Seq;
 List=WebSharper&&WebSharper.List;
 Reactive$1=IntelliFactory&&IntelliFactory.Reactive;
 Reactive$2=Reactive$1&&Reactive$1.Reactive;
 Util=WebSharper&&WebSharper.Util;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 Random=WebSharper&&WebSharper.Random;
 Arrays=WebSharper&&WebSharper.Arrays;
 Chart$1=Global.Chart;
 Operators=WebSharper&&WebSharper.Operators;
 Option=WebSharper&&WebSharper.Option;
 Slice=WebSharper&&WebSharper.Slice;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 AttrModule=UI&&UI.AttrModule;
 Color=Pervasives.Color=Runtime.Class({
  toString:function()
  {
   return this.$==1?this.$0:this.$==2?this.$0:(((((Runtime.Curried(function($1,$2,$3,$4,$5)
   {
    return $1("rgba("+Global.String($2)+", "+Global.String($3)+", "+Global.String($4)+", "+$5.toFixed(6)+")");
   },5))(Global.id))(this.$0))(this.$1))(this.$2))(this.$3);
  }
 },null,Color);
 Seq.headOption=function(s)
 {
  return Seq$1.isEmpty(s)?null:{
   $:1,
   $0:Seq$1.nth(0,s)
  };
 };
 Reactive.SequenceOnlyNew=function(streams)
 {
  var m;
  m=List.ofSeq(streams);
  return m.$==1?Reactive.sequence(Reactive$2.Select(m.$0,function(v)
  {
   return[v];
  }),m.$1):Reactive$2.Return([]);
 };
 Reactive.sequence=function(acc,a)
 {
  var xs,x;
  while(true)
   if(a.$==1)
    {
     xs=a.$1;
     x=a.$0;
     acc=(function(acc$1,x$1)
     {
      return function(f)
      {
       return Reactive$2.CombineLast(acc$1,x$1,function($1,$2)
       {
        return(f($1))($2);
       });
      };
     }(acc,x))(function(o)
     {
      return function(c)
      {
       return Seq$1.append(o,[c]);
      };
     });
     a=xs;
    }
   else
    return acc;
 };
 Pervasives.withIndex=function(s)
 {
  return Seq$1.zip(Seq$1.initInfinite(Global.String),s);
 };
 Pervasives.streamWithLabel=function(stream)
 {
  function f($1,$2)
  {
   return[Global.String($1),$2];
  }
  return Reactive$2.Select(Reactive$2.Aggregate(stream,[0,0],function($1,$2)
  {
   return(function(t)
   {
    var s;
    s=t[0];
    return function(c)
    {
     return[s+1,c];
    };
   }($1))($2);
  }),function($1)
  {
   return f($1[0],$1[1]);
  });
 };
 DataType.Map=function(fn,dt)
 {
  return dt.$==1?{
   $:1,
   $0:Reactive$2.Select(dt.$0,fn)
  }:{
   $:0,
   $0:Seq$1.map(fn,dt.$0)
  };
 };
 ChartConfig.New=function(Title)
 {
  return{
   Title:Title
  };
 };
 SeriesChartConfig.New=function(XAxis,YAxis,FillColor,StrokeColor,IsFilled)
 {
  return{
   XAxis:XAxis,
   YAxis:YAxis,
   FillColor:FillColor,
   StrokeColor:StrokeColor,
   IsFilled:IsFilled
  };
 };
 ColorConfig.New=function(PointColor,PointHighlightFill,PointHighlightStroke,PointStrokeColor)
 {
  return{
   PointColor:PointColor,
   PointHighlightFill:PointHighlightFill,
   PointHighlightStroke:PointHighlightStroke,
   PointStrokeColor:PointStrokeColor
  };
 };
 PolarData.New=function(Value,Color$1,Highlight,Label)
 {
  return{
   Value:Value,
   Color:Color$1,
   Highlight:Highlight,
   Label:Label
  };
 };
 LineChart=Charts.LineChart=Runtime.Class({
  __WithPointStrokeColor:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointStrokeColor(color);
  },
  WithPointHighlightStroke:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightStroke(color);
  },
  __WithPointHighlightFill:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightFill(color);
  },
  __WithPointColor:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointColor(color);
  },
  get__ColorConfig:function()
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$get_ColorConfig();
  },
  __WithStrokeColor:function(color)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithStrokeColor(color);
  },
  __WithFillColor:function(color)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithFillColor(color);
  },
  __WithYAxis:function(yAxis)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithYAxis(yAxis);
  },
  __WithXAxis:function(xAxis)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithXAxis(xAxis);
  },
  get__SeriesConfig:function()
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$get_SeriesConfig();
  },
  __WithTitle:function(title)
  {
   return this.WebSharper_Charting_Charts_IChart_1$WithTitle(title);
  },
  get__Config:function()
  {
   return this.WebSharper_Charting_Charts_IChart_1$get_Config();
  },
  __UpdateData:function(data,props)
  {
   this.WebSharper_Charting_Charts_IMutableChart_2$UpdateData(data,props);
  },
  WithFill:function(b)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,i.YAxis,i.FillColor,i.StrokeColor,b)),this.ccfg);
  },
  get_DataSet:function()
  {
   return this.dataset;
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointStrokeColor:function(color)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(i.PointColor,i.PointHighlightFill,i.PointHighlightStroke,color)));
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightStroke:function(color)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(i.PointColor,i.PointHighlightFill,color,i.PointStrokeColor)));
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightFill:function(color)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(i.PointColor,color,i.PointHighlightStroke,i.PointStrokeColor)));
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointColor:function(color)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(color,i.PointHighlightFill,i.PointHighlightStroke,i.PointStrokeColor)));
  },
  WebSharper_Charting_Charts_IColorChart_1$get_ColorConfig:function()
  {
   return this.ccfg;
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithStrokeColor:function(color)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,i.YAxis,i.FillColor,color,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithFillColor:function(color)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,i.YAxis,color,i.StrokeColor,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithYAxis:function(yAxis)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,yAxis,i.FillColor,i.StrokeColor,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithXAxis:function(xAxis)
  {
   var i;
   return new LineChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(xAxis,i.YAxis,i.FillColor,i.StrokeColor,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$get_SeriesConfig:function()
  {
   return this.scfg;
  },
  WebSharper_Charting_Charts_IChart_1$WithTitle:function(title)
  {
   return new LineChart.New(this.dataset,ChartConfig.New(title),this.scfg,this.ccfg);
  },
  WebSharper_Charting_Charts_IChart_1$get_Config:function()
  {
   return this.cfg;
  },
  WebSharper_Charting_Charts_IMutableChart_2$OnUpdate:function(fn)
  {
   this.event.event.Subscribe(Util.observer(fn));
  },
  WebSharper_Charting_Charts_IMutableChart_2$UpdateData:function(data,props)
  {
   this.event.event.Trigger([data,props]);
  }
 },Obj,LineChart);
 LineChart.New=Runtime.Ctor(function(dataset,cfg,scfg,ccfg)
 {
  Obj.New.call(this);
  this.dataset=dataset;
  this.cfg=cfg;
  this.scfg=scfg;
  this.ccfg=ccfg;
  this.event=new FSharpEvent.New();
 },LineChart);
 BarChart=Charts.BarChart=Runtime.Class({
  __WithStrokeColor:function(color)
  {
   return this.cst(this).WebSharper_Charting_Charts_ISeriesChart_1$WithStrokeColor(color);
  },
  __WithFillColor:function(color)
  {
   return this.cst(this).WebSharper_Charting_Charts_ISeriesChart_1$WithFillColor(color);
  },
  __WithYAxis:function(yAxis)
  {
   return this.cst(this).WebSharper_Charting_Charts_ISeriesChart_1$WithYAxis(yAxis);
  },
  __WithXAxis:function(xAxis)
  {
   return this.cst(this).WebSharper_Charting_Charts_ISeriesChart_1$WithXAxis(xAxis);
  },
  __WithTitle:function(title)
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$WithTitle(title);
  },
  get__SeriesConfig:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_ISeriesChart_1$get_SeriesConfig();
  },
  get__Config:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$get_Config();
  },
  __UpdateData:function(data,props)
  {
   this.WebSharper_Charting_Charts_IMutableChart_2$UpdateData(data,props);
  },
  cst:Global.id,
  get_DataSet:function()
  {
   return this.dataset;
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithStrokeColor:function(color)
  {
   var i;
   return new BarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,i.YAxis,i.FillColor,color,i.IsFilled)));
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithFillColor:function(color)
  {
   var i;
   return new BarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,i.YAxis,color,i.StrokeColor,i.IsFilled)));
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithYAxis:function(yAxis)
  {
   var i;
   return new BarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,yAxis,i.FillColor,i.StrokeColor,i.IsFilled)));
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithXAxis:function(xAxis)
  {
   var i;
   return new BarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(xAxis,i.YAxis,i.FillColor,i.StrokeColor,i.IsFilled)));
  },
  WebSharper_Charting_Charts_IChart_1$WithTitle:function(title)
  {
   return new BarChart.New(this.dataset,ChartConfig.New(title),this.scfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$get_SeriesConfig:function()
  {
   return this.scfg;
  },
  WebSharper_Charting_Charts_IChart_1$get_Config:function()
  {
   return this.cfg;
  },
  WebSharper_Charting_Charts_IMutableChart_2$OnUpdate:function(fn)
  {
   this.event.event.Subscribe(Util.observer(fn));
  },
  WebSharper_Charting_Charts_IMutableChart_2$UpdateData:function(data,props)
  {
   this.event.event.Trigger([data,props]);
  }
 },Obj,BarChart);
 BarChart.New=Runtime.Ctor(function(dataset,cfg,scfg)
 {
  Obj.New.call(this);
  this.dataset=dataset;
  this.cfg=cfg;
  this.scfg=scfg;
  this.event=new FSharpEvent.New();
 },BarChart);
 RadarChart=Charts.RadarChart=Runtime.Class({
  __WithPointStrokeColor:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointStrokeColor(color);
  },
  WithPointHighlightStroke:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightStroke(color);
  },
  __WithPointHighlightFill:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightFill(color);
  },
  __WithPointColor:function(color)
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$WithPointColor(color);
  },
  get__ColorConfig:function()
  {
   return this.WebSharper_Charting_Charts_IColorChart_1$get_ColorConfig();
  },
  __WithStrokeColor:function(color)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithStrokeColor(color);
  },
  __WithFillColor:function(color)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithFillColor(color);
  },
  __WithYAxis:function(yAxis)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithYAxis(yAxis);
  },
  __WithXAxis:function(xAxis)
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$WithXAxis(xAxis);
  },
  get__SeriesConfig:function()
  {
   return this.WebSharper_Charting_Charts_ISeriesChart_1$get_SeriesConfig();
  },
  __WithTitle:function(title)
  {
   return this.WebSharper_Charting_Charts_IChart_1$WithTitle(title);
  },
  get__Config:function()
  {
   return this.WebSharper_Charting_Charts_IChart_1$get_Config();
  },
  __UpdateData:function(data,props)
  {
   this.WebSharper_Charting_Charts_IMutableChart_2$UpdateData(data,props);
  },
  get_DataSet:function()
  {
   return this.dataset;
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointStrokeColor:function(color)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(i.PointColor,i.PointHighlightFill,i.PointHighlightStroke,color)));
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightStroke:function(color)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(i.PointColor,i.PointHighlightFill,color,i.PointStrokeColor)));
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointHighlightFill:function(color)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(i.PointColor,color,i.PointHighlightStroke,i.PointStrokeColor)));
  },
  WebSharper_Charting_Charts_IColorChart_1$WithPointColor:function(color)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,this.scfg,(i=this.ccfg,ColorConfig.New(color,i.PointHighlightFill,i.PointHighlightStroke,i.PointStrokeColor)));
  },
  WebSharper_Charting_Charts_IColorChart_1$get_ColorConfig:function()
  {
   return this.ccfg;
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithStrokeColor:function(color)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,i.YAxis,i.FillColor,color,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithFillColor:function(color)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,i.YAxis,color,i.StrokeColor,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithYAxis:function(yAxis)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(i.XAxis,yAxis,i.FillColor,i.StrokeColor,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$WithXAxis:function(xAxis)
  {
   var i;
   return new RadarChart.New(this.dataset,this.cfg,(i=this.scfg,SeriesChartConfig.New(xAxis,i.YAxis,i.FillColor,i.StrokeColor,i.IsFilled)),this.ccfg);
  },
  WebSharper_Charting_Charts_ISeriesChart_1$get_SeriesConfig:function()
  {
   return this.scfg;
  },
  WebSharper_Charting_Charts_IChart_1$WithTitle:function(title)
  {
   return new RadarChart.New(this.dataset,ChartConfig.New(title),this.scfg,this.ccfg);
  },
  WebSharper_Charting_Charts_IChart_1$get_Config:function()
  {
   return this.cfg;
  },
  WebSharper_Charting_Charts_IMutableChart_2$OnUpdate:function(fn)
  {
   this.event.event.Subscribe(Util.observer(fn));
  },
  WebSharper_Charting_Charts_IMutableChart_2$UpdateData:function(data,props)
  {
   this.event.event.Trigger([data,props]);
  }
 },Obj,RadarChart);
 RadarChart.New=Runtime.Ctor(function(dataset,cfg,scfg,ccfg)
 {
  Obj.New.call(this);
  this.dataset=dataset;
  this.cfg=cfg;
  this.scfg=scfg;
  this.ccfg=ccfg;
  this.event=new FSharpEvent.New();
 },RadarChart);
 PolarAreaChart=Charts.PolarAreaChart=Runtime.Class({
  __WithTitle:function(title)
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$WithTitle(title);
  },
  __DataSet:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet();
  },
  get__Config:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$get_Config();
  },
  __UpdateData:function(props,data)
  {
   this.WebSharper_Charting_Charts_IMutableChart_2$UpdateData(props,data);
  },
  cst:Global.id,
  WebSharper_Charting_Charts_IChart_1$WithTitle:function(title)
  {
   return new PolarAreaChart.New(this.dataset,ChartConfig.New(title));
  },
  WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet:function()
  {
   return this.dataset;
  },
  WebSharper_Charting_Charts_IChart_1$get_Config:function()
  {
   return this.cfg;
  },
  WebSharper_Charting_Charts_IMutableChart_2$OnUpdate:function(fn)
  {
   this.event.event.Subscribe(Util.observer(fn));
  },
  WebSharper_Charting_Charts_IMutableChart_2$UpdateData:function(props,data)
  {
   this.event.event.Trigger([props,data]);
  }
 },Obj,PolarAreaChart);
 PolarAreaChart.New=Runtime.Ctor(function(dataset,cfg)
 {
  Obj.New.call(this);
  this.dataset=dataset;
  this.cfg=cfg;
  this.event=new FSharpEvent.New();
 },PolarAreaChart);
 PieChart=Charts.PieChart=Runtime.Class({
  __WithTitle:function(title)
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$WithTitle(title);
  },
  get__DataSet:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet();
  },
  get__Config:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$get_Config();
  },
  __UpdateData:function(props,data)
  {
   this.WebSharper_Charting_Charts_IMutableChart_2$UpdateData(props,data);
  },
  cst:Global.id,
  WebSharper_Charting_Charts_IChart_1$WithTitle:function(title)
  {
   return new PieChart.New(this.dataset,ChartConfig.New(title));
  },
  WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet:function()
  {
   return this.dataset;
  },
  WebSharper_Charting_Charts_IChart_1$get_Config:function()
  {
   return this.cfg;
  },
  WebSharper_Charting_Charts_IMutableChart_2$OnUpdate:function(fn)
  {
   this.event.event.Subscribe(Util.observer(fn));
  },
  WebSharper_Charting_Charts_IMutableChart_2$UpdateData:function(data,props)
  {
   this.event.event.Trigger([data,props]);
  }
 },Obj,PieChart);
 PieChart.New=Runtime.Ctor(function(dataset,cfg)
 {
  Obj.New.call(this);
  this.dataset=dataset;
  this.cfg=cfg;
  this.event=new FSharpEvent.New();
 },PieChart);
 DoughnutChart=Charts.DoughnutChart=Runtime.Class({
  __WithTitle:function(title)
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$WithTitle(title);
  },
  get__DataSet:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet();
  },
  get__Config:function()
  {
   return this.cst(this).WebSharper_Charting_Charts_IChart_1$get_Config();
  },
  __UpdateData:function(props,data)
  {
   this.WebSharper_Charting_Charts_IMutableChart_2$UpdateData(props,data);
  },
  cst:Global.id,
  WebSharper_Charting_Charts_IChart_1$WithTitle:function(title)
  {
   return new DoughnutChart.New(this.dataset,ChartConfig.New(title));
  },
  WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet:function()
  {
   return this.dataset;
  },
  WebSharper_Charting_Charts_IChart_1$get_Config:function()
  {
   return this.cfg;
  },
  WebSharper_Charting_Charts_IMutableChart_2$OnUpdate:function(fn)
  {
   this.event.event.Subscribe(Util.observer(fn));
  },
  WebSharper_Charting_Charts_IMutableChart_2$UpdateData:function(data,props)
  {
   this.event.event.Trigger([data,props]);
  }
 },Obj,DoughnutChart);
 DoughnutChart.New=Runtime.Ctor(function(dataset,cfg)
 {
  Obj.New.call(this);
  this.dataset=dataset;
  this.cfg=cfg;
  this.event=new FSharpEvent.New();
 },DoughnutChart);
 CompositeChart=Charts.CompositeChart=Runtime.Class({
  get_Charts:function()
  {
   return this.charts;
  }
 },Obj,CompositeChart);
 CompositeChart.New=Runtime.Ctor(function(charts)
 {
  Obj.New.call(this);
  this.charts=charts;
 },CompositeChart);
 Charts.defaultPolarData=function()
 {
  SC$1.$cctor();
  return SC$1.defaultPolarData;
 };
 Charts.defaultColorConfig=function()
 {
  SC$1.$cctor();
  return SC$1.defaultColorConfig;
 };
 Charts.defaultSeriesChartConfig=function()
 {
  SC$1.$cctor();
  return SC$1.defaultSeriesChartConfig;
 };
 Charts.defaultChartConfig=function()
 {
  SC$1.$cctor();
  return SC$1.defaultChartConfig;
 };
 Chart.Combine=function(charts)
 {
  return new CompositeChart.New(charts);
 };
 Chart.Doughnut=function(dataset)
 {
  return new DoughnutChart.New({
   $:0,
   $0:Seq$1.map(function(t)
   {
    return((Charts.defaultPolarData())(t[0]))(t[1]);
   },dataset)
  },Charts.defaultChartConfig());
 };
 Chart.Doughnut$1=function(dataset)
 {
  return new DoughnutChart.New({
   $:0,
   $0:dataset
  },Charts.defaultChartConfig());
 };
 Chart.Pie=function(dataset)
 {
  return new PieChart.New({
   $:0,
   $0:Seq$1.map(function(t)
   {
    return((Charts.defaultPolarData())(t[0]))(t[1]);
   },dataset)
  },Charts.defaultChartConfig());
 };
 Chart.Pie$1=function(dataset)
 {
  return new PieChart.New({
   $:0,
   $0:dataset
  },Charts.defaultChartConfig());
 };
 Chart.PolarArea=function(dataset)
 {
  return new PolarAreaChart.New({
   $:0,
   $0:Seq$1.map(function(t)
   {
    return((Charts.defaultPolarData())(t[0]))(t[1]);
   },dataset)
  },Charts.defaultChartConfig());
 };
 Chart.PolarArea$1=function(dataset)
 {
  return new PolarAreaChart.New({
   $:0,
   $0:dataset
  },Charts.defaultChartConfig());
 };
 Chart.Radar=function(dataset)
 {
  return new RadarChart.New({
   $:0,
   $0:Pervasives.withIndex(dataset)
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 Chart.Radar$1=function(dataset)
 {
  return new RadarChart.New({
   $:0,
   $0:dataset
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 Chart.Bar=function(dataset)
 {
  return new BarChart.New({
   $:0,
   $0:Pervasives.withIndex(dataset)
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig());
 };
 Chart.Bar$1=function(dataset)
 {
  return new BarChart.New({
   $:0,
   $0:dataset
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig());
 };
 Chart.Line=function(dataset)
 {
  return new LineChart.New({
   $:0,
   $0:Pervasives.withIndex(dataset)
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 Chart.Line$1=function(dataset)
 {
  return new LineChart.New({
   $:0,
   $0:dataset
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 LiveChart.Doughnut=function(dataset)
 {
  return new DoughnutChart.New({
   $:1,
   $0:Reactive$2.Select(dataset,function(t)
   {
    return((Charts.defaultPolarData())(t[0]))(t[1]);
   })
  },Charts.defaultChartConfig());
 };
 LiveChart.Doughnut$1=function(dataset)
 {
  return new DoughnutChart.New({
   $:1,
   $0:dataset
  },Charts.defaultChartConfig());
 };
 LiveChart.Pie=function(dataset)
 {
  return new PieChart.New({
   $:1,
   $0:Reactive$2.Select(dataset,function(t)
   {
    return((Charts.defaultPolarData())(t[0]))(t[1]);
   })
  },Charts.defaultChartConfig());
 };
 LiveChart.Pie$1=function(dataset)
 {
  return new PieChart.New({
   $:1,
   $0:dataset
  },Charts.defaultChartConfig());
 };
 LiveChart.PolarArea=function(dataset)
 {
  return new PolarAreaChart.New({
   $:1,
   $0:Reactive$2.Select(dataset,function(t)
   {
    return((Charts.defaultPolarData())(t[0]))(t[1]);
   })
  },Charts.defaultChartConfig());
 };
 LiveChart.PolarArea$1=function(dataset)
 {
  return new PolarAreaChart.New({
   $:1,
   $0:dataset
  },Charts.defaultChartConfig());
 };
 LiveChart.Radar=function(dataset)
 {
  return new RadarChart.New({
   $:1,
   $0:Pervasives.streamWithLabel(dataset)
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 LiveChart.Radar$1=function(dataset)
 {
  return new RadarChart.New({
   $:1,
   $0:dataset
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 LiveChart.Bar=function(dataset)
 {
  return new BarChart.New({
   $:1,
   $0:Pervasives.streamWithLabel(dataset)
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig());
 };
 LiveChart.Bar$1=function(dataset)
 {
  return new BarChart.New({
   $:1,
   $0:dataset
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig());
 };
 LiveChart.Line=function(dataset)
 {
  return new LineChart.New({
   $:1,
   $0:Pervasives.streamWithLabel(dataset)
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 LiveChart.Line$1=function(dataset)
 {
  return new LineChart.New({
   $:1,
   $0:dataset
  },Charts.defaultChartConfig(),Charts.defaultSeriesChartConfig(),Charts.defaultColorConfig());
 };
 SC$1.$cctor=function()
 {
  var rand;
  SC$1.$cctor=Global.ignore;
  SC$1.defaultChartConfig=ChartConfig.New("Chart");
  SC$1.defaultSeriesChartConfig=SeriesChartConfig.New("x","y",new Color({
   $:0,
   $0:220,
   $1:220,
   $2:220,
   $3:0.2
  }),new Color({
   $:0,
   $0:220,
   $1:220,
   $2:220,
   $3:1
  }),true);
  SC$1.defaultColorConfig=ColorConfig.New(new Color({
   $:0,
   $0:220,
   $1:220,
   $2:220,
   $3:1
  }),new Color({
   $:1,
   $0:"#fff"
  }),new Color({
   $:0,
   $0:220,
   $1:220,
   $2:220,
   $3:1
  }),new Color({
   $:1,
   $0:"#fff"
  }));
  SC$1.defaultPolarData=(rand=new Random.New(),function(label)
  {
   return function(data)
   {
    var p,r,g,b;
    p=(r=rand.Next(0,256),(g=rand.Next(0,256),(b=rand.Next(0,256),[new Color({
     $:0,
     $0:r,
     $1:g,
     $2:b,
     $3:1
    }),new Color({
     $:0,
     $0:r,
     $1:g,
     $2:b,
     $3:0.6
    })])));
    return PolarData.New(data,p[0],p[1],label);
   };
  });
 };
 BatchUpdater=ChartJsInternal.BatchUpdater=Runtime.Class({
  Update:function(updater)
  {
   var $this,o;
   function doUpdate()
   {
    $this.handle[0]=null;
    $this.count[0]=0;
    updater();
   }
   $this=this;
   o=this.handle[0];
   if(o==null)
    ;
   else
    Global.clearTimeout(o.$0);
   if(this.count[0]<this.maxCount)
    {
     this.count[0]++;
     this.handle[0]={
      $:1,
      $0:Global.setTimeout(doUpdate,this.interval)
     };
    }
   else
    doUpdate();
  }
 },Obj,BatchUpdater);
 BatchUpdater.New=Runtime.Ctor(function(interval,maxCount)
 {
  Obj.New.call(this);
  this.interval=interval==null?75:interval.$0;
  this.maxCount=maxCount==null?10:maxCount.$0;
  this.handle=[null];
  this.count=[0];
 },BatchUpdater);
 ChartJsInternal.RenderCombinedRadarChart=function(chart,size,cfg,window$1)
 {
  return ChartJsInternal.withNewCanvas(size,function(canvas)
  {
   var labels,e,rendered;
   labels=(e=Seq$1.choose(function(chart$1)
   {
    var m;
    m=chart$1.get_DataSet();
    return m.$==1?null:{
     $:1,
     $0:Seq$1.map(function(t)
     {
      return t[0];
     },m.$0)
    };
   },chart.get_Charts()),Seq$1.length(e)>0?Seq$1.maxBy(Seq$1.length,e):[]);
   rendered=new Global.Chart(canvas,{
    type:"radar",
    data:{
     datasets:Arrays.ofSeq(Seq$1.map(function(chart$1)
     {
      var initials,r;
      initials=ChartJsInternal.mkInitial(chart$1.get_DataSet(),window$1);
      r={};
      r.label=chart$1.get__Config().Title;
      r.backgroundColor=Global.String(chart$1.get__SeriesConfig().FillColor);
      r.borderColor=Global.String(chart$1.get__SeriesConfig().StrokeColor);
      r.pointBackgroundColor=Global.String(chart$1.get__ColorConfig().PointColor);
      r.pointHoverBackgroundColor=Global.String(chart$1.get__ColorConfig().PointHighlightFill);
      r.pointHoverBorderColor=Global.String(chart$1.get__ColorConfig().PointHighlightStroke);
      r.pointBorderColor=Global.String(chart$1.get__ColorConfig().PointStrokeColor);
      r.data=Arrays.map(function(t)
      {
       return t[1];
      },initials);
      return r;
     },chart.get_Charts())),
     labels:Arrays.ofSeq(labels)
    },
    options:cfg==null?{}:cfg.$0
   });
   Seq$1.iteri(function(i,chart$1)
   {
    return ChartJsInternal.registerUpdater(chart$1,function(j,$1)
    {
     var s;
     s=Arrays.get(rendered.data.datasets,i).data;
     s[j]=$1(Arrays.get(s,j));
    },function()
    {
     rendered.update();
    });
   },chart.get_Charts());
   return ChartJsInternal.onCombinedEvent(ChartJsInternal.extractStreams(Seq$1.map(function(chart$1)
   {
    return chart$1.get_DataSet();
   },chart.get_Charts())),Seq$1.length(chart.get_Charts()),window$1,function()
   {
    var data,ds,labels$1;
    data=rendered.data;
    ds=data.datasets;
    labels$1=data.labels;
    Arrays.iter(function(d)
    {
     d.data.shift();
    },ds);
    labels$1.shift();
    return rendered.update();
   },function(a,t)
   {
    var arr,data,ds,labels$1;
    arr=t[0];
    data=rendered.data;
    ds=data.datasets;
    labels$1=data.labels;
    Arrays.iteri(function(i,d)
    {
     var dd;
     dd=d.data;
     return dd[Arrays.length(dd)]=Arrays.get(arr,i);
    },ds);
    labels$1[Arrays.length(labels$1)]=t[1];
    return rendered.update();
   });
  });
 };
 ChartJsInternal.RenderCombinedBarChart=function(chart,size,cfg,window$1)
 {
  return ChartJsInternal.withNewCanvas(size,function(canvas)
  {
   var labels,e,rendered;
   labels=(e=Seq$1.choose(function(chart$1)
   {
    var m;
    m=chart$1.get_DataSet();
    return m.$==1?null:{
     $:1,
     $0:Seq$1.map(function(t)
     {
      return t[0];
     },m.$0)
    };
   },chart.get_Charts()),Seq$1.length(e)>0?Seq$1.maxBy(Seq$1.length,e):[]);
   rendered=new Global.Chart(canvas,{
    type:"bar",
    data:{
     datasets:Arrays.ofSeq(Seq$1.map(function(chart$1)
     {
      var initials,r;
      initials=ChartJsInternal.mkInitial(chart$1.get_DataSet(),window$1);
      r={};
      r.label=chart$1.get__Config().Title;
      r.backgroundColor=Global.String(chart$1.get__SeriesConfig().FillColor);
      r.borderColor=Global.String(chart$1.get__SeriesConfig().StrokeColor);
      r.data=Arrays.map(function(t)
      {
       return t[1];
      },initials);
      return r;
     },chart.get_Charts())),
     labels:Arrays.ofSeq(labels)
    },
    options:cfg==null?{}:cfg.$0
   });
   Seq$1.iteri(function(i,chart$1)
   {
    return ChartJsInternal.registerUpdater(chart$1,function(j,$1)
    {
     var s;
     s=Arrays.get(rendered.data.datasets,i).data;
     s[j]=$1(Arrays.get(s,j));
    },function()
    {
     rendered.update();
    });
   },chart.get_Charts());
   return ChartJsInternal.onCombinedEvent(ChartJsInternal.extractStreams(Seq$1.map(function(chart$1)
   {
    return chart$1.get_DataSet();
   },chart.get_Charts())),Seq$1.length(chart.get_Charts()),window$1,function()
   {
    var data,ds,labels$1;
    data=rendered.data;
    ds=data.datasets;
    labels$1=data.labels;
    Arrays.iter(function(d)
    {
     d.data.shift();
    },ds);
    labels$1.shift();
    return rendered.update();
   },function(a,t)
   {
    var arr,data,ds,labels$1;
    arr=t[0];
    data=rendered.data;
    ds=data.datasets;
    labels$1=data.labels;
    Arrays.iteri(function(i,d)
    {
     var dd;
     dd=d.data;
     return dd[Arrays.length(dd)]=Arrays.get(arr,i);
    },ds);
    labels$1[Arrays.length(labels$1)]=t[1];
    return rendered.update();
   });
  });
 };
 ChartJsInternal.RenderCombinedLineChart=function(chart,size,cfg,window$1)
 {
  return ChartJsInternal.withNewCanvas(size,function(canvas)
  {
   var labels,e,rendered;
   function m(t)
   {
    return t[0];
   }
   labels=(e=Seq$1.map(function(s)
   {
    return Seq$1.map(m,s);
   },Seq$1.choose(function(chart$1)
   {
    var m$1;
    m$1=chart$1.get_DataSet();
    return m$1.$==1?null:{
     $:1,
     $0:ChartJsInternal.mkInitial(m$1,window$1)
    };
   },chart.get_Charts())),Seq$1.length(e)>0?Seq$1.maxBy(Seq$1.length,e):[]);
   rendered=Chart$1.Line(canvas,{
    type:"line",
    data:{
     datasets:Arrays.ofSeq(Seq$1.map(function(chart$1)
     {
      var initials,r;
      initials=ChartJsInternal.mkInitial(chart$1.get_DataSet(),window$1);
      r={};
      r.label=chart$1.get__Config().Title;
      r.backgroundColor=Global.String(chart$1.get__SeriesConfig().FillColor);
      r.borderColor=Global.String(chart$1.get__SeriesConfig().StrokeColor);
      r.pointBackgroundColor=Global.String(chart$1.get__ColorConfig().PointColor);
      r.pointHoverBackgroundColor=Global.String(chart$1.get__ColorConfig().PointHighlightFill);
      r.pointHoverBorderColor=Global.String(chart$1.get__ColorConfig().PointHighlightStroke);
      r.pointBorderColor=Global.String(chart$1.get__ColorConfig().PointStrokeColor);
      r.data=Arrays.map(function(t)
      {
       return t[1];
      },initials);
      return r;
     },chart.get_Charts())),
     labels:Arrays.ofSeq(labels)
    },
    options:cfg==null?{}:cfg.$0
   });
   Seq$1.iteri(function(i,chart$1)
   {
    return ChartJsInternal.registerUpdater(chart$1,function(j,$1)
    {
     var s;
     s=Arrays.get(rendered.data.datasets,i).data;
     s[j]=$1(Arrays.get(s,j));
    },function()
    {
     rendered.update();
    });
   },chart.get_Charts());
   return ChartJsInternal.onCombinedEvent(ChartJsInternal.extractStreams(Seq$1.map(function(chart$1)
   {
    return chart$1.get_DataSet();
   },chart.get_Charts())),Seq$1.length(chart.get_Charts()),window$1,function()
   {
    var data,ds,labels$1;
    data=rendered.data;
    ds=data.datasets;
    labels$1=data.labels;
    Arrays.iter(function(d)
    {
     d.data.shift();
    },ds);
    labels$1.shift();
    return rendered.update();
   },function(a,t)
   {
    var arr,data,ds,labels$1;
    arr=t[0];
    data=rendered.data;
    ds=data.datasets;
    labels$1=data.labels;
    Arrays.iteri(function(i,d)
    {
     var dd;
     dd=d.data;
     return dd[Arrays.length(dd)]=Arrays.get(arr,i);
    },ds);
    labels$1[Arrays.length(labels$1)]=t[1];
    return rendered.update();
   });
  });
 };
 ChartJsInternal.onCombinedEvent=function(streams,l,window$1,remove,add)
 {
  var size;
  size=[0];
  streams.Subscribe(Util.observer(function(data)
  {
   var window$2,arr,o,$1,a;
   function a$1(i,a$2)
   {
    Arrays.set(arr,i,a$2[1]);
   }
   if(window$1==null)
    ;
   else
    {
     window$2=window$1.$0;
     size[0]>=window$2?remove(window$2,size[0]):void 0;
    }
   arr=Arrays.ofSeq(Seq$1.delay(function()
   {
    return Seq$1.map(function()
    {
     return 0;
    },Operators.range(1,l));
   }));
   Seq$1.iter(function($2)
   {
    return a$1($2[0],$2[1]);
   },data);
   o=Seq.headOption(data);
   if(o==null)
    ;
   else
    {
     $1=o.$0;
     $1[0];
     a=$1[1];
     add(size[0],[arr,a[0]]);
    }
   size[0]++;
  }));
 };
 ChartJsInternal.extractStreams=function(dataSet)
 {
  return Reactive.SequenceOnlyNew(Seq$1.choose(Global.id,Seq$1.mapi(function(i,data)
  {
   return data.$==0?null:{
    $:1,
    $0:Reactive$2.Select(data.$0,function(d)
    {
     return[i,d];
    })
   };
  },dataSet)));
 };
 ChartJsInternal.RenderPolarAreaChart=function(chart,size,typ,window$1)
 {
  return ChartJsInternal.withNewCanvas(size,function(canvas)
  {
   var initial,toBGColor,toHBGColor,toValue,toLabel,rendered,r,r$1,r$2;
   function a(i,$1)
   {
    var s;
    s=Arrays.get(rendered.data.datasets,0).data;
    s[i]=$1(Arrays.get(s,i));
    rendered.update();
   }
   initial=ChartJsInternal.mkInitial(chart.WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet(),null);
   toBGColor=Arrays.map(function(e)
   {
    return Global.String(e.Color);
   },initial);
   toHBGColor=Arrays.map(function(e)
   {
    return Global.String(e.Highlight);
   },initial);
   toValue=Arrays.map(function(e)
   {
    return e.Value;
   },initial);
   toLabel=Arrays.map(function(e)
   {
    return e.Label;
   },initial);
   rendered=new Chart$1(canvas,typ.$==1?{
    type:"pie",
    data:{
     datasets:[(r={},r.data=toValue,r.backgroundColor=toBGColor,r.hoverBackgroundColor=toHBGColor,r)],
     labels:toLabel
    },
    options:typ.$0
   }:typ.$==2?{
    type:"doughnut",
    data:{
     datasets:[(r$1={},r$1.data=toValue,r$1.backgroundColor=toBGColor,r$1.hoverBackgroundColor=toHBGColor,r$1)],
     labels:toLabel
    },
    options:typ.$0
   }:{
    type:"polarArea",
    data:{
     datasets:[(r$2={},r$2.data=toValue,r$2.backgroundColor=toBGColor,r$2.hoverBackgroundColor=toHBGColor,r$2)],
     labels:toLabel
    },
    options:typ.$0
   });
   ChartJsInternal.onEvent(chart.WebSharper_Charting_Charts_IPolarAreaChart_1$get_DataSet(),window$1,function()
   {
    var data,ds,labels;
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iter(function(d)
    {
     d.data.shift();
    },ds);
    labels.shift();
    return rendered.update();
   },function(a$1,polardata)
   {
    var data,ds,labels;
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iteri(function(i,d)
    {
     var dd;
     dd=d.data;
     return dd[Arrays.length(dd)]=polardata.Value;
    },ds);
    labels[Arrays.length(labels)]=polardata.Label;
    return rendered.update();
   });
   return chart.WebSharper_Charting_Charts_IMutableChart_2$OnUpdate(function($1)
   {
    return a($1[0],$1[1]);
   });
  });
 };
 ChartJsInternal.RenderRadarChart=function(chart,size,cfg,window$1)
 {
  return ChartJsInternal.withNewCanvas(size,function(canvas)
  {
   var initial,rendered,r;
   initial=ChartJsInternal.mkInitial(chart.get_DataSet(),window$1);
   rendered=new Chart$1(canvas,{
    type:"radar",
    data:{
     datasets:[(r={},r.label=chart.get__Config().Title,r.backgroundColor=Global.String(chart.get__SeriesConfig().FillColor),r.borderColor=Global.String(chart.get__SeriesConfig().StrokeColor),r.pointBackgroundColor=Global.String(chart.get__ColorConfig().PointColor),r.pointHoverBackgroundColor=Global.String(chart.get__ColorConfig().PointHighlightFill),r.pointHoverBorderColor=Global.String(chart.get__ColorConfig().PointHighlightStroke),r.pointBorderColor=Global.String(chart.get__ColorConfig().PointStrokeColor),r.data=Arrays.map(function(t)
     {
      return t[1];
     },initial),r)],
     labels:Arrays.map(function(t)
     {
      return t[0];
     },initial)
    },
    options:cfg==null?{}:cfg.$0
   });
   ChartJsInternal.registerUpdater(chart,function(i,$1)
   {
    var s;
    s=Arrays.get(rendered.data.datasets,0).data;
    s[i]=$1(Arrays.get(s,i));
   },function()
   {
    rendered.update();
   });
   return ChartJsInternal.onEvent(chart.get_DataSet(),window$1,function()
   {
    var data,ds,labels;
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iter(function(d)
    {
     d.data.shift();
    },ds);
    labels.shift();
    return rendered.update();
   },function(a,t)
   {
    var arr,data,ds,labels;
    arr=t[1];
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iteri(function(i,d)
    {
     var dd;
     dd=d.data;
     return dd[Arrays.length(dd)]=arr;
    },ds);
    labels[Arrays.length(labels)]=t[0];
    return rendered.update();
   });
  });
 };
 ChartJsInternal.RenderBarChart=function(chart,size,cfg,window$1)
 {
  return ChartJsInternal.withNewCanvas(size,function(canvas)
  {
   var initial,rendered,r;
   initial=ChartJsInternal.mkInitial(chart.get_DataSet(),window$1);
   rendered=new Chart$1(canvas,{
    type:"bar",
    data:{
     datasets:[(r={},r.label=chart.get__Config().Title,r.backgroundColor=Global.String(chart.get__SeriesConfig().FillColor),r.borderColor=Global.String(chart.get__SeriesConfig().StrokeColor),r.data=Arrays.map(function(t)
     {
      return t[1];
     },initial),r)],
     labels:Arrays.map(function(t)
     {
      return t[0];
     },initial)
    },
    options:cfg==null?{}:cfg.$0
   });
   ChartJsInternal.registerUpdater(chart,function(i,$1)
   {
    var s;
    s=Arrays.get(rendered.data.datasets,0).data;
    s[i]=$1(Arrays.get(s,i));
   },function()
   {
    rendered.update();
   });
   return ChartJsInternal.onEvent(chart.get_DataSet(),window$1,function()
   {
    var data,ds,labels;
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iter(function(d)
    {
     d.data.shift();
    },ds);
    labels.shift();
    return rendered.update();
   },function(a,t)
   {
    var arr,data,ds,labels;
    arr=t[1];
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iteri(function(i,d)
    {
     var dd;
     dd=d.data;
     return dd[Arrays.length(dd)]=arr;
    },ds);
    labels[Arrays.length(labels)]=t[0];
    return rendered.update();
   });
  });
 };
 ChartJsInternal.RenderLineChart=function(chart,size,cfg,window$1)
 {
  return ChartJsInternal.withNewCanvas(size,function(canvas)
  {
   var initial,rendered,r;
   initial=ChartJsInternal.mkInitial(chart.get_DataSet(),window$1);
   rendered=Chart$1.Line(canvas,{
    type:"line",
    data:{
     datasets:[(r={},r.label=chart.get__Config().Title,r.fill=chart.get__SeriesConfig().IsFilled,r.backgroundColor=Global.String(chart.get__SeriesConfig().FillColor),r.borderColor=Global.String(chart.get__SeriesConfig().StrokeColor),r.pointBackgroundColor=Global.String(chart.get__ColorConfig().PointColor),r.pointHoverBackgroundColor=Global.String(chart.get__ColorConfig().PointHighlightFill),r.pointHoverBorderColor=Global.String(chart.get__ColorConfig().PointHighlightStroke),r.pointBorderColor=Global.String(chart.get__ColorConfig().PointStrokeColor),r.data=Arrays.map(function(t)
     {
      return t[1];
     },initial),r)],
     labels:Arrays.map(function(t)
     {
      return t[0];
     },initial)
    },
    options:cfg==null?{}:cfg.$0
   });
   ChartJsInternal.registerUpdater(chart,function(i,$1)
   {
    var s;
    s=Arrays.get(rendered.data.datasets,0).data;
    s[i]=$1(Arrays.get(s,i));
   },function()
   {
    rendered.update();
   });
   return ChartJsInternal.onEvent(chart.get_DataSet(),window$1,function()
   {
    var data,ds,labels;
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iter(function(d)
    {
     d.data.shift();
    },ds);
    labels.shift();
    return rendered.update();
   },function(a,t)
   {
    var arr,data,ds,labels;
    arr=t[1];
    data=rendered.data;
    ds=data.datasets;
    labels=data.labels;
    Arrays.iteri(function(i,d)
    {
     var dd;
     dd=d.data;
     return dd[Arrays.length(dd)]=arr;
    },ds);
    labels[Arrays.length(labels)]=t[0];
    return rendered.update();
   });
  });
 };
 ChartJsInternal.onEvent=function(dataSet,window$1,remove,add)
 {
  var size;
  if(dataSet.$==1)
   {
    size=[0];
    dataSet.$0.Subscribe(Util.observer(function(data)
    {
     var window$2;
     if(window$1==null)
      ;
     else
      {
       window$2=window$1.$0;
       size[0]>=window$2?remove(window$2,size[0]):void 0;
      }
     add(size[0],data);
     size[0]++;
    }));
   }
 };
 ChartJsInternal.mkInitial=function(dataSet,window$1)
 {
  return dataSet.$==0?Option.fold(function(s,w)
  {
   var skp;
   skp=Arrays.length(s)-w;
   return skp>=Arrays.length(s)?[]:skp<=0?s:Slice.array(s,{
    $:1,
    $0:skp
   },null);
  },Arrays.ofSeq(dataSet.$0),window$1):[];
 };
 ChartJsInternal.withNewCanvas=function(size,k)
 {
  var width,height;
  width=size.$0;
  height=size.$1;
  return Doc.Element("div",[AttrProxy.Create("width",Global.String(width)),AttrProxy.Create("height",Global.String(height)),AttrModule.Style("width",Global.String(width)+"px"),AttrModule.Style("height",Global.String(height)+"px")],[Doc.Element("canvas",[AttrModule.OnAfterRender(function(el)
  {
   var ctx;
   ctx=el.getContext("2d");
   el.width=width;
   el.height=height;
   k(el,ctx);
  })],[])]);
 };
 ChartJsInternal.registerUpdater=function(mChart,upd,fin)
 {
  var bu;
  function a($1,$2)
  {
   upd($1,$2);
   bu.Update(fin);
  }
  bu=new BatchUpdater.New(null,null);
  mChart.WebSharper_Charting_Charts_IMutableChart_2$OnUpdate(function($1)
  {
   return a($1[0],$1[1]);
  });
 };
 ChartJs.Render=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderCombinedRadarChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),Config,Window);
 };
 ChartJs.Render$1=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderCombinedBarChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),Config,Window);
 };
 ChartJs.Render$2=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderCombinedLineChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),Config,Window);
 };
 ChartJs.Render$3=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderPolarAreaChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),{
   $:0,
   $0:Config==null?{}:Config.$0
  },Window);
 };
 ChartJs.Render$4=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderPolarAreaChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),{
   $:2,
   $0:Config==null?{}:Config.$0
  },Window);
 };
 ChartJs.Render$5=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderPolarAreaChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),{
   $:1,
   $0:Config==null?{}:Config.$0
  },Window);
 };
 ChartJs.Render$6=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderRadarChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),Config,Window);
 };
 ChartJs.Render$7=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderBarChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),Config,Window);
 };
 ChartJs.Render$8=function(chart,Size,Config,Window)
 {
  var d;
  return ChartJsInternal.RenderLineChart(chart,(d=Renderers.defaultSize(),Size==null?d:Size.$0),Config,Window);
 };
 Renderers.defaultSize=function()
 {
  SC$2.$cctor();
  return SC$2.defaultSize;
 };
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.defaultSize={
   $:0,
   $0:500,
   $1:200
  };
 };
}(self));
