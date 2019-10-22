import RequestService from "../../Services/ModelServices/RequestService";

const hasRequestsMixin = {
    requests_count: 0,
    requests: [],
    async getRequests() {
        return await RequestService.all();
    }
};

export default hasRequestsMixin;