import { coookie_options } from "@/config";
import Cookies from "js-cookie";

export const setNewRequest = () => {
    localStorage.setItem("pendingReq","1");
}
export const setRequestToDone = () => {
    localStorage.setItem("pendingReq","0");
}
export const hasPendingRequest = () => {
    if(localStorage.getItem("pendingReq") == "1") return true

    return false
}
export const hasOngoingRequest = () => {
    if(Cookies.get("request_data")) return true

    return false
}
export const setOngoingRequest = (value :any) => {
    Cookies.set("request_data",JSON.stringify(value),coookie_options)
}
export const setAutoRequest = (value:string) => {
    Cookies.set("auto_request",value,coookie_options)
} 

export const isAutoRequest = () => {
    if(Cookies.get("auto_request") == "1") return true
    return false 
}