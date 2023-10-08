const HttpStatusCode = require("../httpStatusCode/HttpStatusCode.js");

class ApplicationError {
    Message;
    StatusCode;

    constructor(Message, StatusCode = HttpStatusCode.BadRequest){
        this.Message = Message;
        this.StatusCode = StatusCode;
    }
}

module.exports = ApplicationError;
