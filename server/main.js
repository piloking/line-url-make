async function handler(request, connInfo) {
  const requrl=new URL(request.url)
  if(requrl.pathname=="/make"){
    const html=await Deno.readTextFile("./site/index.html")
    return new Response(html,{status:200,headers:{"Content-Type":"text/html;charset=UTF-8"}})
  }else if(requrl.pathname=="/url"){
    
  }
  return new Response("",{status:404})
}
Deno.serve(handler)
