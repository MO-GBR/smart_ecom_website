import moment from "moment";

const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

class ActionResponse {
    constructor(data, statusCode) {
        this.data = data;
        this.statusCode = statusCode;
        this.time = currentTime;
    }
}

export{ ErrorResponse, ActionResponse, currentTime };