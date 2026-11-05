const url=process.env.STORAGE_URL||process.env.STORAGE_KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL;
const token=process.env.STORAGE_TOKEN||process.env.STORAGE_KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
export function ready(){return Boolean(url&&token)}
export async function redis(command,...args){
 if(!ready()) throw new Error("Storage is not configured");
 const r=await fetch(url,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify([command,...args])});
 if(!r.ok) throw new Error("Storage request failed");
 const data=await r.json(); if(data.error) throw new Error(data.error); return data.result;
}
export async function getJson(key){const v=await redis("GET",key);return v?JSON.parse(v):null}
export async function setJson(key,value,ttl){const args=[key,JSON.stringify(value)];if(ttl)args.push("EX",ttl);return redis("SET",...args)}
export const json=(status,body,headers={})=>({statusCode:status,headers:{"Content-Type":"application/json","Cache-Control":"no-store",...headers},body:JSON.stringify(body)});
