import ModelService from '../Services/ModelServices/ModelService';

class Model {

    id;
    created_at = "";
    updated_at = "";
    service = new ModelService();

    types = {};

    /**
     *
     * @param data
     * @returns {Model}
     */
    static new(data = {}) {
        return new this(data);
    }

    /**
     *
     * @param data
     */
    constructor(data = {}) {
        this._fillWithData(data);
    }

    _fillWithData(data) {
        Object.keys(data)
            .forEach(key => {
                const value = data[key];
                const requiredType = this.types[key];

                if (requiredType) {
                    window.requiredType = requiredType;
                    window.Model = Model;
                }

                if (this.hasOwnProperty(key) && value) {

                    if (typeof value === 'object' &&
                        requiredType !== undefined &&
                        requiredType.prototype instanceof Model) {

                        /**
                         * attempting to fill model property
                         * with a new model instance if
                         * required with this.types
                         */
                        this[key] = this.types[key].new(value)

                    } else {

                        /**
                         * filling model property with value
                         */
                        this[key] = value;

                    }

                }

            });
    }

    /**
     * @param data {Object}
     * @returns {Model}
     */
    fill(data = {}) {
        this._fillWithData(data);
        return this;
    }

    /**
     * @returns {boolean}
     */
    get isANewRecord() {
        return !this.id;
    }

    get data() {
        const {service, ...rest} = this;
        return {...rest};
    }

    /**
     *
     * @returns {Promise<Model | never>}
     */
    save() {
        return this.service.save(this)
            .then(requestData => this.fill(requestData));
    }

}

export default Model;