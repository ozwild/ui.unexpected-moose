import BookingService from "../../Services/ModelServices/BookingService";

const hasCommentsMixin = {
    comments_count: 0,
    comments: [],
    getComments() {
        return [];
    }
};

export default hasCommentsMixin;