import { Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import CustomResponse from "../../util/response";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import logger from "../../config/logger";
import { DepartmentService } from "../services/department.service";
const departmentService = new DepartmentService();

const fileName = "[deparment.conrtoller.js]";

export class DepartmentController {

    public async addDepartment(req: Request, res: Response) {
        const methodName = "[addDepartment]";
        try {
            const errors = await validationResult(req);

            if (!errors.isEmpty()) {
                return CustomResponse.setResponse(res, false, HttpStatus.BAD_REQUEST, errorMessage.FAILED, version.v1, errors.array());
            }

            const addedDepartment = await departmentService.create(req.body);

            return CustomResponse.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, [addedDepartment]);
        }
        catch (error) {
            logger.error(fileName + methodName + ":error in main try block:" + `${error}`);
            return CustomResponse.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, []);
        }
    }
}