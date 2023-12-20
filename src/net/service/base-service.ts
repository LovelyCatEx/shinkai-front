import type {Result} from "@/net/result";
import {internalGet, internalPost} from "@/net/request";

export class BaseService {
    private readonly urlPrefix: string

    constructor(urlPrefix: string) {
        this.urlPrefix = urlPrefix
    }

    protected getUrl(url: string): string {
        return this.urlPrefix + url
    }

    protected doGet<T>(url: string, headers: object, params: object, callback: RequestCallback<Result<T>>) {
        console.log("[GET]" + url)
        internalGet<T>(this.getUrl(url), headers, params, (res) => {
                if (res.code === 200) {
                    callback.onSuccess(res.message, res)
                } else {
                    callback.onFailure?.(res.code, res.message, res)
                }
            }, (data, code, url, message) => {
                callback.onFailure?.(code, message, data)
            }, (err) => {
                callback.onError?.(err)
            })
    }

    protected doPost<T>(url: string, headers: object, params: object, callback: RequestCallback<Result<T>>) {
        console.log("[POST]" + url)
        internalPost<T>(this.getUrl(url), headers, params, (res) => {
            if (res.code === 200) {
                callback.onSuccess(res.message, res)
            } else {
                callback.onFailure?.(res.code, res.message, res)
            }
        }, (data, code, url, message) => {
            callback.onFailure?.(code, message, data)
        }, (err) => {
            callback.onError?.(err)
        })
    }
}

export interface RequestCallback<T> {
    onSuccess(message: string, data: T): void
    onFailure?(code: number, message: string, data: any): void
    onError?(err: any): void
}