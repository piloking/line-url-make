async function handler(request, connInfo) {
  const requrl=new URL(request.url)
  const bot_UA=["Twitter","facebook"]
  if(requrl.pathname=="/make"){
    const html=await Deno.readTextFile("./site/index.html")
    return new Response(html,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
  }else if(requrl.pathname=="/url"){
    if((request.headers.get("user-agent").match(/Twitter/))||(request.headers.get("user-agent").match(/facebook/))){
      let img,x,y,text,title
      img=decodeURIComponent(requrl.searchParams.get("img"))
      x=decodeURIComponent(requrl.searchParams.get("x"))
      y=decodeURIComponent(requrl.searchParams.get("y"))
      text=decodeURIComponent(requrl.searchParams.get("text"))
      title=decodeURIComponent(requrl.searchParams.get("title"))
      let dummyHTML=await Deno.readTextFile("./server/dummy.html")
      dummyHTML=dummyHTML.replaceAll("{img}",img).replaceAll("{x}",x).replaceAll("{y}",y).replaceAll("{text}",text).replaceAll("{title}",title)
      return new Response(dummyHTML,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
    }else if(requrl.pathname=="/img"){
      let id=requrl.searchParams.get("id")
      let res=await fetch("https://api-data.line.me/v2/bot/message/"+id+"/content",{headers:{"Authorization": `Bearer EVRl5WucxFH1XkeEnds0sd9lXj2Lli+LMpmVbmH+rV2MtCtOs/OxpwPT20qJ4eTT1PNRbOOxT/c3v7OJUBgmaU2i9HrzzgllPCTe84NbekzHCENGOes95u0OqnnJrywqnyROAKlcvr3qtU0wAfG4fAdB04t89/1O/w1cDnyilFU=`}},"body": null,"method": "GET")
      return res
    }else{
      let url=decodeURIComponent(requrl.searchParams.get("url"))
      return new Response("",{status:301,headers:{"location":url}})
    }
  }
  return new Response("",{status:404})
}
Deno.serve(handler)
