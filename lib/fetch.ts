export async function Customfetch(url: string,options: any){
    options.headers = {...options.headers,"Content-Type":"application/json"};
    const request = await fetch(url,options);
    const response = await request.json();
    return response
}