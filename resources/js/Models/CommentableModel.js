import CommentService from "../Services/ModelServices/CommentService";
import Model from "./Model";

class CommentableModel extends Model {

    comments_count = 0;
    comments = [];

    async getComments(page = 1) {
        const morph_type = this.morph_class;
        const morph_id = this.id;
        if (!(morph_type && morph_id)) {
            return new Promise(resolve => resolve([]));
        }
        return await CommentService.all(page, {morph_type, morph_id});
    }

}

export default CommentableModel;