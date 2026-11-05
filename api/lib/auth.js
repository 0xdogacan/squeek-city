import {randomBytes} from "node:crypto";
import {getJson,setJson} from "./redis.js";
export function addressOf(req){const raw=req.headers.cookie||"";const hit=raw.match(/(?:^|; )sc_session=([^;]+)/);return hit?decodeURIComponent(hit[1]):null}
export async function requireUser(req){const token=addressOf(req);if(!token) return null;return getJson("sc:session:"+token)}
export function token(){return randomBytes(32).toString("hex")}
export function nonce(){return randomBytes(18).toString("hex")}
export function message(address,n){return `Squeek City\n\nSign this message to enter the city.\nNo transaction and no gas.\n\nWallet: ${address}\nNonce: ${n}`}
export function sessionCookie(value){return `sc_session=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${process.env.VERCEL_ENV==="production"?"; Secure":""}`}
