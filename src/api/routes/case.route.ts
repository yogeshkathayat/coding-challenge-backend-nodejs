import express from "express";
import caseValidation from "../validations/case.validation";
import { CaseController } from "../controllers/case.controller";
const router = express.Router();
const caseController = new CaseController();


/**
 * @api {post} /api/v1/case/add add case
 * @apiDescription add a case
 * @apiVersion 1.0.0
 * @apiName add
 * @apiGroup case
 * @apiPermission public
 *
 * @apiParam  {String}      license           license of bike 
 * @apiParam  {String}      color             color  of bike
 * @apiParam  {String}      type              type  of bike
 * @apiParam  {String}      owner             owner name
 * @apiParam  {String}      dateOfTheft       dateOfTheft of bike  
 * @apiParam  {String}      theftDescription  theftDescription 
 * 
 *
 * @apiSuccess  {String}      license           license of bike 
 * @apiSuccess  {String}      color             color  of bike
 * @apiSuccess  {String}      type              type  of bike
 * @apiSuccess  {String}      owner             owner name
 * @apiSuccess  {String}      dateOfTheft       dateOfTheft of bike  
 * @apiSuccess  {String}      theftDescription  theftDescription
 * @apiSuccess  {String}      status            status of case
 * @apiSuccess  {String}      officerId         id of officer that has been assinged to the case
 * 
 * 
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 *
 *  @apiErrorExample {json} List error
 *    {
 *    "status": false,
 *    "code": 400,
 *    "appVersion": "v1.0.0",
 *    "message": "value must have at least 4 children",
 *    "result": []
 *    }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "status": true,
 *     "code": 200,
 *     "message": "Sucess",
 *     "appVersion": "v1.0.0",
 *     "result": [
 *       {
 *         "id": 1,
 *         "license": "NYPD",
 *         "updatedAt": "2019-03-25T10:53:22.137Z",
 *         "createdAt": "2019-03-25T10:53:22.137Z"
 *     }
 *   ]
 * }
 *
 */
router.route("/add")
    .post(caseValidation("add"), caseController.addCase);


 /**
 * @api {post} /api/v1/case/resolve resolve case
 * @apiDescription resolve a case
 * @apiVersion 1.0.0
 * @apiName resolve
 * @apiGroup case
 * @apiPermission public
 *
 * @apiParam  {String}      caseId           id of case
 *
 * @apiSuccess  {String}      license           license of bike 
 * @apiSuccess  {String}      color             color  of bike
 * @apiSuccess  {String}      type              type  of bike
 * @apiSuccess  {String}      owner             owner name
 * @apiSuccess  {String}      dateOfTheft       dateOfTheft of bike  
 * @apiSuccess  {String}      theftDescription  theftDescription
 * @apiSuccess  {String}      status            status of case
 * @apiSuccess  {String}      officerId         id of officer that has been assinged to the case
 * 
 * 
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 *
 *  @apiErrorExample {json} List error
 *    {
 *    "status": false,
 *    "code": 400,
 *    "appVersion": "v1.0.0",
 *    "message": "value must have at least 4 children",
 *    "result": []
 *    }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "status": true,
 *     "code": 200,
 *     "message": "Sucess",
 *     "appVersion": "v1.0.0",
 *     "result": [
 *       {
 *         "id": 1,
 *         "license": "NYPD",
 *         "updatedAt": "2019-03-25T10:53:22.137Z",
 *         "createdAt": "2019-03-25T10:53:22.137Z"
 *     }
 *   ]
 * }
 *
 */   
router.route("/resolve")
    .post(caseValidation("resolve"), caseController.resolveCase);
router.route("/find")
    .get(caseValidation("find"), caseController.findCases);

export default router;