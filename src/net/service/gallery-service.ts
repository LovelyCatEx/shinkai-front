import type {RequestCallback} from "@/net/service/base-service"
import {BaseService} from "@/net/service/base-service";
import type {Result} from "@/net/result";
import type {GalleryImage} from "@/net/object/server-vo";

export class GalleryService extends BaseService {
    constructor() {
        super("/api/gallery");
    }

    public getCreationComments(callback: RequestCallback<Result<Array<GalleryImage>>>) {
        this.doGet("/all", {}, {}, callback)
    }
}