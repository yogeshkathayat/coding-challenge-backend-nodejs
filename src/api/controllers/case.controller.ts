import { Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import CustomResponse from "../../util/response";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import logger from "../../config/logger";
import { CaseService } from "../services/case.service";
const caseService = new CaseService();

const fileName = "[case.controller.js]";

export class CaseController {
    public async addCase(req: Request, res: Response) {
        const methodName = "[addCase]";
        try {
            const errors = await validationResult(req);

            if (!errors.isEmpty()) {
                return CustomResponse.setResponse(res, false, HttpStatus.BAD_REQUEST, errorMessage.FAILED, version.v1, {error: errors.array()});
            }

            const addedCase = await caseService.create(req.body);

            return CustomResponse.setResponse(res, true, HttpStatus.CREATED, errorMessage.SUCCESS, version.v1, addedCase);
        }
        catch (error) {
            logger.error(fileName + methodName + ":error in main try block:" + `${error}`);
            return CustomResponse.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }


    public async resolveCase(req: Request, res: Response) {
        const methodName = "[resolveCase]";
        try {
            const errors = await validationResult(req);

            if (!errors.isEmpty()) {
                return CustomResponse.setResponse(res, false, HttpStatus.BAD_REQUEST, errorMessage.FAILED, version.v1,{error:errors.array()});
            }

            const resolvedCase = await caseService.resolve(req.body.caseId);

            return CustomResponse.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, resolvedCase);
        }
        catch (error) {
            logger.error(fileName + methodName + ":error in main try block:" + `${error}`);
            return CustomResponse.setResponse(res, false, HttpStatus.BAD_REQUEST, `${error}`, version.v1, {});
        }
    }


    public async findCases(req: Request, res: Response) {
        const methodName = "[findCases]";
        try {
            const errors = await validationResult(req);

            if (!errors.isEmpty()) {
                return CustomResponse.setResponse(res, false, HttpStatus.BAD_REQUEST, errorMessage.FAILED, version.v1, {error: errors.array()});
            }

            const casesList = await caseService.find(req.query);

            return CustomResponse.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1,casesList);
        }
        catch (error) {
            logger.error(fileName + methodName + " :error in main try block: " + `${error}`);
            return CustomResponse.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1,{});
        }
    }

}