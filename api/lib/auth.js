const crypto=require("crypto");const {get,set}=require("./redis");
function random(){return crypto.randomBytes(24).toString("hex")}
function readCookie(req,name){const match=(req.headers.cookie||"").match(new RegExp("(?:^|; )"+name+"=([^;]+)"));return match?decodeURIComponent(match[1]):null}
function message(address,nonce){return "Squeek City\n\nSign to enter your district.\nNo transaction. No gas.\n\nWallet: "+address+"\nNonce: "+nonce}
async function session(req){const id=readCookie(req,"sc_session");return id?get("sc:session:"+id):null}
function cookie(value){return "sc_session="+value+"; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800"+(process.env.VERCEL_ENV==="production"?"; Secure":"")}
module.exports={random,message,session,cookie,set};
