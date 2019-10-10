const expirationLength = 3;

const getNewExpirationDate = () => {
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() + expirationLength);
};

class DataPacket {

    key;
    expiration;
    data;

    constructor({key, data, expiration} = {}) {
        this.key = key;
        this.data = data;
        this.expiration = expiration;
    }

    static fromJSON(json) {
        const {key, data, expiration} = JSON.parse(json);
        return new DataPacket({key, data, expiration});
    }

    toJSON() {
        return JSON.stringify({
            key: this.key,
            data: this.data,
            expiration: this.expiration
        });
    }

}

class CacheService {

    static store = (key, data) => {
        const expiration = getNewExpirationDate();
        const packet = new DataPacket({key, data, expiration});
        window.localStorage.setItem(`cache_${key}`, packet.toJSON());
    };

    static retrieve = (key) => {
        const storedData = window.localStorage.getItem(`cache_${key}`);
        if (!storedData) {
            return;
        }
        const packet = DataPacket.fromJSON(storedData);
        if (packet.expiration > new Date()) {
            return
        }
        return packet.data;
    };

    static flushKey(key) {
        window.localStorage.removeItem(`cache_${key}`);
    }

    static flushAll() {
        Object.keys(localStorage).forEach(key => {
            if (key.includes('cache', 0)) {
                localStorage.removeItem(key);
            }
        })
    }

}

export default CacheService;