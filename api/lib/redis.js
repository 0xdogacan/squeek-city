const base=process.env.STORAGE_URL||process.env.STORAGE_KV_REST_API_URL||process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL;
const token=process.env.STORAGE_TOKEN||process.env.STORAGE_KV_REST_API_TOKEN||process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
function configured(){return Boolean(base&&token)}
async function command(...args){if(!configured())throw new Error("City storage is not connected yet");const r=await fetch(base,{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify(args)});const d=await r.json();if(!r.ok||d.error)throw new Error(d.error||"Storage request failed");return d.result}
async function get(key){const value=await command("GET",key);return value?JSON.parse(value):null}
async function set(key,value,ttl){const args=["SET",key,JSON.stringify(value)];if(ttl)args.push("EX",String(ttl));return command(...args)}
module.exports={configured,command,get,set};
