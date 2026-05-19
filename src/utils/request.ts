import Taro from "@tarojs/taro";
import qs from "qs";

/**
 * 请求方式枚举类型
 */
type MethodType = "GET" | "POST" | "PUT" | "DELETE";

/**
 * 通用请求入参配置
 * @param url 请求地址
 * @param data 请求参数
 * @param contentType 请求体类型
 * @param showLoading 是否展示加载动画
 * @param noAuth 是否跳过携带Token（登录/验证码等接口使用）
 */
interface IParams<D = any> {
  url: string;
  data?: D;
  contentType?: string;
  showLoading?: boolean;
  noAuth?: boolean;
}

/**
 * 后端统一全局响应格式
 * @param code 业务状态码
 * @param message 提示信息
 * @param data 业务返回数据
 */
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 接口基础域名（从环境变量读取）
const baseUrlPrefix = process.env.TARO_APP_API || "";

// 加载动画计数器，解决多请求并发重复显示/关闭问题
let loadingCount = 0;

// 登录跳转锁，防止多个接口401同时跳转登录页
let isRedirecting = false;

/**
 * 统一处理登录过期 401 逻辑
 * 清空本地Token + 防抖跳转登录页
 */
function handleUnauthorized() {
  Taro.setStorageSync("Authorization", "");
  if (!isRedirecting) {
    isRedirecting = true;
    Taro.showToast({ title: "登录已过期，请重新登录", icon: "none" });
    setTimeout(() => {
      Taro.navigateTo({
        url: "/pages/login/index",
        complete: () => {
          isRedirecting = false;
        },
      });
    }, 1500);
  }
}

/**
 * 核心网络请求方法
 * @param params 请求配置参数
 * @param method 请求方式
 * @returns Promise 统一后端返回数据
 */
const request = <T = any>(
  params: IParams,
  method: MethodType,
): Promise<BaseResponse<T>> => {
  const { url, data, contentType, showLoading = false, noAuth = false } = params;

  let requestUrl = url.startsWith("http") ? url : `${baseUrlPrefix}${url}`;

  // 请求头
  const header: Record<string, string> = {
    "content-type": contentType || "application/json;charset=utf-8",
  };

  // 携带Token
  if (!noAuth) {
    const token = Taro.getStorageSync("Authorization");
    if (token) {
      header["Authorization"] = `Bearer ${token}`;
    }
  }

  // 加载动画
  if (showLoading) {
    loadingCount++;
    if (loadingCount === 1) {
      Taro.showLoading({ title: "加载中...", mask: true });
    }
  }

  let requestData = data;
  // GET 请求用 qs 序列化数组，indices:false 生成重复key格式
  if (method === "GET" && data) {
    const queryStr = qs.stringify(data, { indices: false });
    requestUrl += requestUrl.includes("?") ? `&${queryStr}` : `?${queryStr}`;
    requestData = undefined;
  }

  return new Promise((resolve, reject) => {
    Taro.request({
      url: requestUrl,
      data: requestData,
      method,
      header,
      timeout: 10000,

      success: (res) => {
        const response = res.data as BaseResponse<T>;
        const statusCode = response.code || res.statusCode;

        if (statusCode === 200) {
          resolve(response);
        } else if (statusCode === 401) {
          handleUnauthorized();
          reject(response);
        } else {
          Taro.showToast({
            title: response.message || "服务请求异常",
            icon: "none",
          });
          reject(response);
        }
      },

      fail: (err) => {
        if (err.errMsg?.includes("timeout")) {
          Taro.showToast({ title: "请求超时，请稍后重试", icon: "none" });
        } else {
          Taro.showToast({ title: "网络连接失败，请检查网络", icon: "none" });
        }
        reject(err);
      },

      complete: () => {
        if (showLoading) {
          loadingCount--;
          if (loadingCount <= 0) {
            loadingCount = 0;
            Taro.hideLoading();
          }
        }
      },
    });
  });
};

/**
 * 对外导出简化调用方法
 */
export const http = {
  GET: <T = any>(url: string, data?: any, config?: Partial<IParams>) =>
    request<T>({ url, data, ...config }, "GET"),

  POST: <T = any>(url: string, data?: any, config?: Partial<IParams>) =>
    request<T>({ url, data, ...config }, "POST"),

  PUT: <T = any>(url: string, data?: any, config?: Partial<IParams>) =>
    request<T>({ url, data, ...config }, "PUT"),

  DELETE: <T = any>(url: string, data?: any, config?: Partial<IParams>) =>
    request<T>({ url, data, ...config }, "DELETE"),
};

export default request;
