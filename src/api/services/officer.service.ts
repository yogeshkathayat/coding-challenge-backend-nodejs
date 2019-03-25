
import Officer from "../models/officer.model";
import { CaseService } from "../services/case.service";
import Department from "../models/department.model";

const caseService = new CaseService();


export class OfficerService {

    async create(officerObj: Officer) {

        try {
            // check if departmentId exists or not
            const dept = await Department.findOne({
                where: {
                    id: officerObj.departmentId
                }
            });

            if (!dept) {
                throw new Error("departmentId does not exists");
            }
            else {
                const officer = await Officer.create(officerObj);
                // check if any case in unassigned, assign that case to the officer
                const caseAssigned = await caseService.assignCase(officer.id);
                if (caseAssigned) {
                    officer.caseId = caseAssigned.id;
                }
                return officer;
            }
        } catch (error) {
            throw error;
        }
    }
}
