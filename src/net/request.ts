import axios from 'axios'
import type {Result} from "@/net/result";

function defaultFailure(data: object, code: number, url: string, message: string) {
    console.warn(`Request: ${url}, code: ${code}, message: ${message}`)
    console.log("failed")
    console.warn(data)
}

const defaultError = (err: any) => {
    console.log("error")
    console.error(err)
}

export function internalGet<T>(url: string, headers: object, params: object,
                               successFx: (res: Result<T>) => void,
                               failureFx: (data: object, code: number, url: string, message: string) => void = defaultFailure,
                               errorFx: (err: any) => void = defaultError) {
    console.log("[I]GET: " + url)
    console.log("[I]GET Params: ", params)
    axios.get(url,{
        params: params,
        headers: headers
    }).then((res: any) => {
        console.log("[I]GET Result: ", res)
        let data = res.data
        let code = data.code
        let message = data.message
        if (code === 200) {
            successFx(data)
        } else {
            failureFx(data, code, url, message)
        }
    }).catch((err: any) => errorFx(err))
}

export function internalPost<T>(url: string, headers: object, data: object,
                                successFx: (res: Result<T>) => void,
                                failureFx: (data: object, code: number, url: string, message: string) => void = defaultFailure,
                                errorFx: (err: any) => void = defaultError) {
    console.log("[I]POST: " + url)
    console.log("[I]POST Headers: ", headers)
    console.log("[I]POST Params: ", data)
    axios.post(url, data,{
        headers: headers
    }).then((res: any) => {
        let data = res.data
        let code = data.code
        let message = data.message
        console.log("[I]POST Result: ", res)
        if (code === undefined && res.status === 200) {
            data = {'code': res.status, 'message': message, 'data': data}
            successFx(data)
        } else if (code === 200) {
            successFx(data)
        } else {
            failureFx(data, code, url, message)
        }
    }).catch((err: any) => errorFx(err))
}