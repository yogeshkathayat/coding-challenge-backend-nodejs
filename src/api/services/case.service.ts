
import Case from "../models/case.model";
import Officer from "../models/officer.model";
import {
    errorMessage,
    version,
    caseStatus
} from "../../config/constants";


export class CaseService {

    async create(caseObj: Case) {
        try {
            const availableOfficer = await Officer.findOne({
                where: {
                    caseId: undefined
                },
                order: [
                    ["updatedAt", "DESC"]
                ]
            });

            caseObj.status = caseStatus.NEW;

            if (availableOfficer) {
                caseObj.officerId = availableOfficer.id;
                caseObj.status = caseStatus.IN_PROGRESS;
            }

            const createdCase = await Case.create(caseObj);

            availableOfficer.caseId = createdCase.id;
            await availableOfficer.save();

            return createdCase;
        } catch (error) {
            throw error;
        }

    }


    async resolve(caseId: number) {
        try {
            const caseObj = await Case.findOne({ where: { id: caseId } });
            if (!caseObj) {
                throw new Error("Case not found");
            }
            if (caseObj.status === caseStatus.NEW) {
                throw new Error("Case is not yet assigned");
            }
            if (caseObj.status === caseStatus.RESOLVED) {
                throw new Error("Case already resolved");
            }

            caseObj.status = caseStatus.RESOLVED;
            const resolvedCase = await caseObj.save();
            await this.assignCase(caseObj.officerId);
            return resolvedCase;
        } catch (error) {

        }

    }

    async find(query: any) {

    }

    async assignCase(officerId: number) {
        try {
            const unassignedCase = await Case.findOne({
                where: {
                    status: caseStatus.NEW
                },
                order: [
                    ["createdAt", "DESC"]
                ]
            });
            if (unassignedCase) {
                await Officer.update(
                    {
                        caseId: unassignedCase.id
                    },
                    {
                        where: {
                            id: officerId
                        }
                    });

                unassignedCase.officerId = officerId;
                unassignedCase.status = caseStatus.IN_PROGRESS;
                return await unassignedCase.save();
            }
            return false;
        } catch (error) {
            throw error;

        }
    }

}
