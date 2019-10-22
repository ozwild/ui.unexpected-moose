import Comment from "../../Models/Comment";
import ModelService from "./ModelService";

class CommentService extends ModelService {

    static get model() {
        return Comment;
    }

    static get prefix() {
        return 'comments';
    }

    static get apiPath() {
        return '/api/comments';
    }

}

export default CommentService;