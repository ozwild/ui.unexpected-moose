import UserService from "../Services/ModelServices/UserService";
import Model from "./Model";
import RequestService from "../Services/ModelServices/RequestService";
import BookingService from "../Services/ModelServices/BookingService";
import CommentService from "../Services/ModelServices/CommentService";

class Comment extends Model {

    title = "";
    body = "";
    commentable_id = 0;
    commentable_type = "";
    
    service = CommentService;

    constructor(data = {}) {
        super(data);
        this._fillWithData(data);
    }

}

export default Comment;