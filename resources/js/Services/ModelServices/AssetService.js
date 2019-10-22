import Asset from '../../Models/Asset';
import RestorableModelService from "./RestorableModelService";

export default class AssetService extends RestorableModelService {

    static get model() {
        return Asset;
    }

    static get prefix() {
        return 'assets';
    }

    static get apiPath() {
        return '/api/assets';
    }


}