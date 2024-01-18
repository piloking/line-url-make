import renderToString from 'https://cdn.skypack.dev/preact-render-to-string@6.2.2?dts'
import {page} from './ip.jsx'
function escape(unsafeText){
  if(typeof unsafeText !== 'string'){
    return unsafeText;
  }
  return unsafeText.replace(
    /[&'`"<>]/g, 
    function(match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match]
    }
  );
}
async function handler(request, connInfo) {
  const requrl=new URL(request.url)
  const bot_UA=["Twitter","facebook"]
  if(requrl.pathname=="/make"){
    const html=await Deno.readTextFile("./site/index.html")
    return new Response(html,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
  }else if(requrl.pathname=="/pro"){
    const html=await Deno.readTextFile("./site/pro.html")
    return new Response(html,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
  }else if(requrl.pathname=="/short"){
    const res=await fetch("https://xgd.io/V1/shorten?key=6cdeb7b6073585a6dbf32942e13f0133&url="+encodeURIComponent(requrl.searchParams.get("url")))
    return res
  }else if(requrl.pathname=="/url"){
    if((request.headers.get("user-agent").match(/Twitter/))||(request.headers.get("user-agent").match(/facebook/))||(request.headers.get("user-agent").match(/Discord/))){
      let img,x,y,text,title,copyurl;
      img=(requrl.searchParams.get("img"))
      x=(requrl.searchParams.get("x"))
      y=(requrl.searchParams.get("y"))
      text=(requrl.searchParams.get("text"))
      title=(requrl.searchParams.get("title"))
      copyurl=(requrl.searchParams.get("copyurl"))
      if(copyurl){
        return new Response("",{status:301,headers:{"location":copyurl}})
      }
      let dummyHTML=await Deno.readTextFile("./server/dummy.html")
      dummyHTML=dummyHTML.replaceAll("{img}",img).replaceAll("{x}",x).replaceAll("{y}",y).replaceAll("{text}",text).replaceAll("{title}",title)
      return new Response(dummyHTML,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
    }else{
      let url=(requrl.searchParams.get("url"))
      if(requrl.searchParams.get("tag")){
        let tag=(requrl.searchParams.get("tag"))
        const kv=await Deno.openKv()
        var data=[];
        try{
        let old_data=await kv.get(["ip",tag])
        data=old_data.value
        }catch{
        data=[]
        }
        if(!data){
          data=[]
        }
        let date=Date.now()
        const { hostname, port } = connInfo.remoteAddr;
        data.push({ip:hostname,ua:request.headers.get("user-agent"),date:date})
        await kv.set(["ip",tag],data)
        console.log({ip:hostname,ua:request.headers.get("user-agent"),date:date})
      }
      return new Response("",{status:301,headers:{"location":url}})
    }
  }else if(requrl.pathname=="/img"){
      let id=requrl.searchParams.get("id")
      let res=await fetch("https://api-data.line.me/v2/bot/message/"+id+"/content",{headers:{"Authorization": `Bearer EVRl5WucxFH1XkeEnds0sd9lXj2Lli+LMpmVbmH+rV2MtCtOs/OxpwPT20qJ4eTT1PNRbOOxT/c3v7OJUBgmaU2i9HrzzgllPCTe84NbekzHCENGOes95u0OqnnJrywqnyROAKlcvr3qtU0wAfG4fAdB04t89/1O/w1cDnyilFU=`},"body": null,"method": "GET"})
      if(requrl.searchParams.get("tag")){
        let tag=(requrl.searchParams.get("tag"))
        const kv=await Deno.openKv()
        var data=[];
        try{
        let old_data=await kv.get(["ip",tag])
        data=old_data.value
        }catch{
        data=[]
        }
        if(!data){
          data=[]
        }
        let date=Date.now()
        const { hostname, port } = connInfo.remoteAddr;
        data.push({ip:hostname,ua:request.headers.get("user-agent"),date:date})
        await kv.set(["ip",tag],data)
        console.log({ip:hostname,ua:request.headers.get("user-agent"),date:date})
      }
    return res
  }else if(requrl.pathname=="/ip"){
      const kv=await Deno.openKv()
      let tag=(requrl.searchParams.get("tag"))
      var data={value:[]}
        try{
        data=await kv.get(["ip",tag])
        }catch{
        data={value:[]}
        }
        if(!data){
          data={value:[]}
        }
      
      if(requrl.searchParams.get("del")){
        await kv.delete(["ip",tag])
      }
      let html=await Deno.readTextFile("./server/dummy.html")
      let element="<ol>"
      try{
      data.value.forEach(e=>{
        element=element+`<li>
          <p>
            IP: ${e.ip}
          </p>
          <p>
            User-Agent: ${escape(e.ua)}
          </p>
          <p>
            Time: ${new Date(e.date).toUTCString()}
          </p>
        </li><br>`
      })}catch{}
      element=element+`</ol><a href="https://line-url.deno.dev/ip?tag=${tag}&del=true">データを削除</a>`
      html=html.replaceAll("{img}","").replaceAll("{x}","").replaceAll("{y}","").replaceAll("{title}","").replaceAll("<p>{text}</p>",element)
      return new Response(html,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
  }else if(requrl.pathname=="///dead"){
    if((request.headers.get("user-agent").match(/Twitter/))||(request.headers.get("user-agent").match(/facebook/))){
      let img,x,y,text,title;
      const imgs=[
        "https://images.pexels.com/photos/1743366/pexels-photo-1743366.jpeg",
        "https://images.pexels.com/photos/1526713/pexels-photo-1526713.jpeg",
        "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg",
        "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg",
        "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg",
        "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg",
        "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
        "https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg",
        "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg",
      ]
      img=imgs[Math.floor(Math.random()*9)]+"?"+Date.now()
      x=1000
      y=1000
      text="The BEST tool to kill you !"
      title="The BEST tool to kill you !"
      let dummyHTML=await Deno.readTextFile("./server/dummy.html")
      dummyHTML=dummyHTML.replaceAll("{img}",img).replaceAll("{x}",x).replaceAll("{y}",y).replaceAll("{text}",text).replaceAll("{title}",title)
      return new Response(dummyHTML,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
    }else{
      return new Response("",{status:301,headers:{"location":"https://youtu.be/"}})
    }
  }
  return new Response("",{status:404})
}
Deno.serve(handler)
