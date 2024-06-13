import {HttpError} from 'http-errors';
const errorHandlerMiddlewere = (err, req, res) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({ status: err.status, message: err.message ,data: err,});
        return;
    }

    res.status(500).json({ status: 500, message: 'Something went wrong', data: err });
};
export default errorHandlerMiddlewere;
