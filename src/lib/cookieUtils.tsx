import { coookie_options } from "@/config"
import Cookies from "js-cookie"

export const removeRequestData = () => {
    Cookies.remove("user",coookie_options)
    Cookies.remove("role",coookie_options)
    Cookies.remove("client",coookie_options)
    Cookies.remove("request_data",coookie_options)
    Cookies.remove("img_url", coookie_options)
}
export const removeToken = () => {
    Cookies.remove("jt")
}

export const saveImg = (url:string) => {
    Cookies.set("img_url",url, coookie_options)
}
export const getImg = () =>{
    if(!Cookies.get("img_url")) return ""
   return Cookies.get("img_url") || ""
}
export const hasLoginUser = () => {
  if(!Cookies.get("jt")) return false
   return true
}