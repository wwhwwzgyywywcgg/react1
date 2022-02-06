import { get, post, put, del } from "../utils/request";

/**
 * 获取列表
 * @param params
 * @returns
 */
export const loadModelsAPI = (params: any)=>
  get("/api/v1/admin/productcategory", params);

/**
 * 新增
 * @param data
 * @returns
 */
export const insertModel = (data: any) =>
  post("/api/v1/admin/productcategory", data);

/**
 * 根据id修改
 * @param id
 * @param data
 * @returns
 */
export const modifyById = (id: string, data: any) =>
  put("/api/v1/admin/productcategory/" + id, data);

/**
 * 根据id删除
 * @param id
 * @returns
 */
export const delById = (id: string) =>
  del("/api/v1/admin/productcategory/" + id);
