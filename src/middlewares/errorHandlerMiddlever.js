import createHttpError from 'http-errors';

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof createHttpError.HttpError) {
        res.status(err.status).json({ status: err.status, message: err.message, data: err });
    } else {
        res.status(500).json({ status: 500, message: 'Something went wrong', data: err });
    }
};

export default errorHandlerMiddleware;
