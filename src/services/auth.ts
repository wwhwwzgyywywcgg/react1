import {post} from "../utils/request"

export const loginAPI = (data:any)=>post("/api/v1/auth/manager_login",data)