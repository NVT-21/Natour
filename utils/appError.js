
// create Error
class appError extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ?'fail':'error';
        this.isOperational=true;// (neeus co cai nay nghia la nhung loi do minh luong truoc va tao nen)
        Error.captureStackTrace(this, this.constructor)
}
}
module.exports = appError;
