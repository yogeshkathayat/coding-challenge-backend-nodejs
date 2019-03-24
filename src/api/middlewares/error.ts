

import {
    errorMessage,
    version
} from "../../util/constants";
import * as HttpStatus from "http-status";
import CustomResponse from "../../util/response";
import { Request, Response } from "express";

class HandleError {
    /**
     * Catch 404 and forward to error handler
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @return {*}
     */
    public notFound(req: Request, res: Response, next: any) {
        CustomResponse.setResponse(res, false, HttpStatus.NOT_FOUND, errorMessage.NOT_FOUND, version.v1, {});
    }
}

export default new HandleError();