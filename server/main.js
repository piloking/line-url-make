async function handler(request, connInfo) {
  const requrl=new URL(request.url)
  if(requrl.pathname=="/make"){
    const html=Deno.readTextFile("./site/index.html")
    return new Response(html)
  }else if(requrl.pathname=="/url"){}
}
Deno.serve(handler)
