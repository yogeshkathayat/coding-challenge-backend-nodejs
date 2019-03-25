import { Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import CustomResponse from "../../util/response";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import logger from "../../config/logger";
import { OfficerService } from "../services/officer.service";
const officerService = new OfficerService();

const fileName = "[officer.controller.js]";

export class OfficerController {
    public async addOfficer(req: Request, res: Response) {
        const methodName = "[addOfficer]";
        try {
            const errors = await validationResult(req);

            if (!errors.isEmpty()) {
                return CustomResponse.setResponse(res, false, HttpStatus.BAD_REQUEST, errorMessage.FAILED, version.v1, errors.array());
            }

            const addedOfficer = await officerService.create(req.body);

            return CustomResponse.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, [addedOfficer]);
        }
        catch (error) {
            logger.error(fileName + methodName + ":error in main try block:" + `${error}`);
            return CustomResponse.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, []);
        }
    }

}