import {BaseService} from "@/net/service/base-service";
import type {RequestCallback} from "@/net/service/base-service"
import type {Result} from "@/net/result";
import type {Comment} from "@/net/object/server-vo";

export class CommentService extends BaseService {
    constructor() {
        super("/api/comment");
    }

    public getCreationComments(creationId: number, callback: RequestCallback<Result<Array<Comment>>>) {
        this.doGet("/comments", {}, {cid: creationId}, callback)
    }

    public postNewComment(comment: Comment, callback: RequestCallback<Result<any>>) {
        console.log(JSON.stringify(comment))
        this.doGet("/new", {}, {...comment}, callback)
    }
}