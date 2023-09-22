class ApplicationError {
    Message;
    StatusCode;

    constructor(Message, StatusCode = 400){
        this.Message = Message;
        this.StatusCode = StatusCode;
    }
}

module.exports = ApplicationError;