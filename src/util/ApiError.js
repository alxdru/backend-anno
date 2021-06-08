class APIError extends Error {
    constructor(message) {
        super(message);
        this.name = 'APIError';
        this.status = 411;
    }
}

module.exports.APIError = APIError;