(function(Global)
{
 "use strict";
 var IntelliFactory,Reactive,Disposable,Observer,HotStream,WebSharper,Obj,Reactive$1,Reactive$2,SC$1,Runtime,Control,FSharpEvent,Util,List,Collections,Dictionary,Seq;
 IntelliFactory=Global.IntelliFactory=Global.IntelliFactory||{};
 Reactive=IntelliFactory.Reactive=IntelliFactory.Reactive||{};
 Disposable=Reactive.Disposable=Reactive.Disposable||{};
 Observer=Reactive.Observer=Reactive.Observer||{};
 HotStream=Reactive.HotStream=Reactive.HotStream||{};
 WebSharper=Global.WebSharper;
 Obj=WebSharper&&WebSharper.Obj;
 Reactive$1=Reactive.Reactive=Reactive.Reactive||{};
 Reactive$2=Reactive$1.Reactive=Reactive$1.Reactive||{};
 SC$1=Global.StartupCode$IntelliFactory_Reactive$Reactive=Global.StartupCode$IntelliFactory_Reactive$Reactive||{};
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 Util=WebSharper&&WebSharper.Util;
 List=WebSharper&&WebSharper.List;
 Collections=WebSharper&&WebSharper.Collections;
 Dictionary=Collections&&Collections.Dictionary;
 Seq=WebSharper&&WebSharper.Seq;
 Disposable.New=function(d)
 {
  return{
   Dispose:function()
   {
    return d();
   }
  };
 };
 Observer.New=function(onNext,onComplete)
 {
  return{
   OnNext:onNext,
   OnCompleted:function()
   {
    return onComplete();
   },
   OnError:function()
   {
    return null;
   }
  };
 };
 HotStream=Reactive.HotStream=Runtime.Class({
  Trigger:function(v)
  {
   this.Latest[0]={
    $:1,
    $0:v
   };
   this.Event.event.Trigger(v);
  },
  Subscribe:function(o)
  {
   this.Latest[0]!=null?o.OnNext(this.Latest[0].$0):void 0;
   return this.Event.event.Subscribe(o);
  }
 },null,HotStream);
 HotStream.New$1=function(x)
 {
  return HotStream.New([{
   $:1,
   $0:x
  }],new FSharpEvent.New());
 };
 HotStream.New$2=function()
 {
  return HotStream.New([null],new FSharpEvent.New());
 };
 HotStream.New=function(Latest,Event)
 {
  return new HotStream({
   Latest:Latest,
   Event:Event
  });
 };
 Reactive$2=Reactive$1.Reactive=Runtime.Class({
  Sequence:function(ios)
  {
   return Reactive$1.Sequence(ios);
  },
  Drop:function(io,count)
  {
   return Reactive$1.Drop(io,count);
  },
  Aggregate:function(io,s,a)
  {
   return Reactive$1.Aggregate(io,s,function($1,$2)
   {
    return(a($1))($2);
   });
  },
  Heat:function(io)
  {
   return Reactive$1.Heat(io);
  },
  CombineLatest:function(io1,io2,f)
  {
   return Reactive$1.CombineLatest(io1,io2,function($1,$2)
   {
    return(f($1))($2);
   });
  },
  CollectLatest:function(io)
  {
   return Reactive$1.CollectLatest(io);
  },
  SelectMany:function(io)
  {
   return Reactive$1.SelectMany(io);
  },
  Switch:function(io)
  {
   return Reactive$1.Switch(io);
  },
  Merge:function(io1,io2)
  {
   return Reactive$1.Merge(io1,io2);
  },
  Concat:function(io1,io2)
  {
   return Reactive$1.Concat(io1,io2);
  },
  Where:function(io,f)
  {
   return Reactive$1.Where(io,f);
  },
  Choose:function(io,f)
  {
   return Reactive$1.Choose(io,f);
  },
  Select:function(io,f)
  {
   return Reactive$1.Select(io,f);
  },
  Never:function()
  {
   return Reactive$1.Never();
  },
  Return:function(x)
  {
   return Reactive$1.Return(x);
  }
 },Obj,Reactive$2);
 Reactive$2.New=Runtime.Ctor(function()
 {
  Obj.New.call(this);
 },Reactive$2);
 Reactive$1.Default=function()
 {
  SC$1.$cctor();
  return SC$1.Default;
 };
 Reactive$1.Heat=function(io)
 {
  var s;
  s=HotStream.New$2();
  io.Subscribe(Util.observer(function(a)
  {
   s.Trigger(a);
  }));
  return s;
 };
 Reactive$1.Sequence=function(ios)
 {
  function sequence(ios$1)
  {
   return ios$1.$==1?Reactive$1.CombineLatest(ios$1.$0,sequence(ios$1.$1),function($1,$2)
   {
    return new List.T({
     $:1,
     $0:$1,
     $1:$2
    });
   }):Reactive$1.Return(List.T.Empty);
  }
  return Reactive$1.Select(sequence(List.ofSeq(ios)),Global.id);
 };
 Reactive$1.CollectLatest=function(outer)
 {
  return{
   Subscribe:function(o)
   {
    var dict,index;
    dict=new Dictionary.New$5();
    index=[0];
    return outer.Subscribe(Util.observer(function(inner)
    {
     var currentIndex;
     index[0]++;
     currentIndex=index[0];
     inner.Subscribe(Util.observer(function(value)
     {
      dict.set_Item(currentIndex,value);
      o.OnNext(Seq.delay(function()
      {
       return Seq.map(function(pair)
       {
        return pair.V;
       },dict);
      }));
     }));
    }));
   }
  };
 };
 Reactive$1.Aggregate=function(io,seed,acc)
 {
  return{
   Subscribe:function(o)
   {
    var state;
    state=[seed];
    return io.Subscribe(Util.observer(function(value)
    {
     state[0]=acc(state[0],value);
     o.OnNext(state[0]);
    }));
   }
  };
 };
 Reactive$1.SelectMany=function(io)
 {
  return{
   Subscribe:function(o)
   {
    var disp,d;
    disp=[Global.ignore];
    d=io.Subscribe(Util.observer(function(o1)
    {
     var d$1;
     d$1=o1.Subscribe(Util.observer(function(a)
     {
      o.OnNext(a);
     }));
     disp[0]=function()
     {
      disp[0]();
      d$1.Dispose();
     };
    }));
    return Disposable.New(function()
    {
     disp[0]();
     d.Dispose();
    });
   }
  };
 };
 Reactive$1.Switch=function(io)
 {
  return{
   Subscribe:function(o)
   {
    var index,disp;
    index=[0];
    disp=[null];
    return io.Subscribe(Util.observer(function(o1)
    {
     var currentIndex;
     index[0]++;
     if(disp[0]!=null)
      disp[0].$0.Dispose();
     currentIndex=index[0];
     disp[0]={
      $:1,
      $0:o1.Subscribe(Util.observer(function(v)
      {
       if(currentIndex===index[0])
        o.OnNext(v);
      }))
     };
    }));
   }
  };
 };
 Reactive$1.CombineLast=function(io1,io2,f)
 {
  return{
   Subscribe:function(o)
   {
    var lv1s,lv2s,d1,d2;
    function update()
    {
     if(lv1s.length>0&&lv2s.length>0)
      o.OnNext(f(lv1s.shift(),lv2s.shift()));
    }
    lv1s=[];
    lv2s=[];
    d1=io1.Subscribe(Observer.New(function(x)
    {
     lv1s.push(x);
     update();
    },Global.ignore));
    d2=io2.Subscribe(Observer.New(function(y)
    {
     lv2s.push(y);
     update();
    },Global.ignore));
    return Disposable.New(function()
    {
     d1.Dispose();
     d2.Dispose();
    });
   }
  };
 };
 Reactive$1.CombineLatest=function(io1,io2,f)
 {
  return{
   Subscribe:function(o)
   {
    var lv1,lv2,d1,d2;
    function update()
    {
     var $1,$2;
     $1=lv1[0];
     $2=lv2[0];
     if($1!=null&&$1.$==1)
      $2!=null&&$2.$==1?o.OnNext(f($1.$0,$2.$0)):void 0;
    }
    lv1=[null];
    lv2=[null];
    d1=io1.Subscribe(Observer.New(function(x)
    {
     lv1[0]={
      $:1,
      $0:x
     };
     update();
    },Global.ignore));
    d2=io2.Subscribe(Observer.New(function(y)
    {
     lv2[0]={
      $:1,
      $0:y
     };
     update();
    },Global.ignore));
    return Disposable.New(function()
    {
     d1.Dispose();
     d2.Dispose();
    });
   }
  };
 };
 Reactive$1.Range=function(start,count)
 {
  return{
   Subscribe:function(o)
   {
    var i,$1;
    for(i=start,$1=start+count;i<=$1;i++)o.OnNext(i);
    return Disposable.New(Global.ignore);
   }
  };
 };
 Reactive$1.Concat=function(io1,io2)
 {
  return{
   Subscribe:function(o)
   {
    var innerDisp,outerDisp;
    innerDisp=[null];
    outerDisp=io1.Subscribe(Observer.New(function(a)
    {
     o.OnNext(a);
    },function()
    {
     innerDisp[0]={
      $:1,
      $0:io2.Subscribe(o)
     };
    }));
    return Disposable.New(function()
    {
     innerDisp[0]!=null?innerDisp[0].$0.Dispose():void 0;
     outerDisp.Dispose();
    });
   }
  };
 };
 Reactive$1.Merge=function(io1,io2)
 {
  return{
   Subscribe:function(o)
   {
    var completed1,completed2,disp1,disp2;
    completed1=[false];
    completed2=[false];
    disp1=io1.Subscribe(Observer.New(function(a)
    {
     o.OnNext(a);
    },function()
    {
     completed1[0]=true;
     completed1[0]&&completed2[0]?o.OnCompleted():void 0;
    }));
    disp2=io2.Subscribe(Observer.New(function(a)
    {
     o.OnNext(a);
    },function()
    {
     completed2[0]=true;
     completed1[0]&&completed2[0]?o.OnCompleted():void 0;
    }));
    return Disposable.New(function()
    {
     disp1.Dispose();
     disp2.Dispose();
    });
   }
  };
 };
 Reactive$1.Drop=function(io,count)
 {
  return{
   Subscribe:function(o1)
   {
    var index;
    index=[0];
    return io.Subscribe(Util.observer(function(v)
    {
     index[0]++;
     index[0]>count?o1.OnNext(v):void 0;
    }));
   }
  };
 };
 Reactive$1.Choose=function(io,f)
 {
  return{
   Subscribe:function(o1)
   {
    return io.Subscribe(Util.observer(function(v)
    {
     var m;
     m=f(v);
     if(m==null)
      ;
     else
      o1.OnNext(m.$0);
    }));
   }
  };
 };
 Reactive$1.Where=function(io,f)
 {
  return{
   Subscribe:function(o1)
   {
    return io.Subscribe(Util.observer(function(v)
    {
     if(f(v))
      o1.OnNext(v);
    }));
   }
  };
 };
 Reactive$1.Select=function(io,f)
 {
  return{
   Subscribe:function(o1)
   {
    return io.Subscribe(Util.observer(function(v)
    {
     o1.OnNext(f(v));
    }));
   }
  };
 };
 Reactive$1.Never=function()
 {
  return{
   Subscribe:function()
   {
    return Disposable.New(Global.ignore);
   }
  };
 };
 Reactive$1.Return=function(x)
 {
  return{
   Subscribe:function(o)
   {
    o.OnNext(x);
    o.OnCompleted();
    return Disposable.New(Global.ignore);
   }
  };
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.Default=new Reactive$2.New();
 };
}(self));
