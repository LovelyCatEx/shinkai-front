import {BaseService} from "@/net/service/base-service";
import type {RequestCallback} from "@/net/service/base-service"
import type {Result} from "@/net/result";
import type {Creation} from "@/net/object/server-vo";
import {internalGet} from "@/net/request";

export class CreationService extends BaseService {
    constructor() {
        super("/api/creation");
    }

    public getAllCreations(callback: RequestCallback<Result<Array<Creation>>>) {
        this.doGet("/all", {}, {}, callback)
    }

    public getCreation(id: number, callback: RequestCallback<Result<Creation>>) {
        this.doGet("/details", {}, {id: id}, callback)
    }
}