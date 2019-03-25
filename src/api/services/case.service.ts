
import Case from "../models/case.model";
import Officer from "../models/officer.model";
import Department from "../models/department.model";
import {
    caseStatus
} from "../../config/constants";


export class CaseService {

    async create(caseObj: Case) {
        try {
            const availableOfficer = await Officer.findOne({
                where: {
                    caseId: null
                },
                order: [
                    ["updatedAt", "ASC"]
                ]
            });

            caseObj.status = caseStatus.NEW;

            if (availableOfficer) {
                caseObj.officerId = availableOfficer.id;
                caseObj.status = caseStatus.IN_PROGRESS;
            }

            const createdCase = await Case.create(caseObj);
            if (availableOfficer) {
                availableOfficer.caseId = createdCase.id;
                await availableOfficer.save();
            }

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
            await Officer.update(
                {
                    caseId: null
                },
                {
                    where: {
                        id: caseObj.officerId
                    }
                });
            await this.assignCase(caseObj.officerId);
            return resolvedCase;
        } catch (error) {
            throw error;

        }

    }

    async find(query: any) {
        try {

            const whereQuery: any = {};
            if (query.id) {
                whereQuery.id = query.id;
            }
            if (query.status) {
                whereQuery.status = query.status;
            }
            if (query.license) {
                whereQuery.license = query.license;
            }
            if (query.color) {
                whereQuery.color = query.color;
            }
            if (query.type) {
                whereQuery.type = query.type;
            }
            if (query.owner) {
                whereQuery.owner = query.owner;
            }
            if (query.dateOfThefQt) {
                whereQuery.dateOfTheft = query.dateOfTheft;
            }
            if (query.officerId) {
                whereQuery.officerId = query.officerId;
            }


            const cases = await Case.findAll({
                where: whereQuery,
                include: [{
                    model: Officer,
                    include: [Department]
                }]
            });

            return cases;

        } catch (error) {
            throw error;
        }

    }

    async assignCase(officerId: number) {
        try {
            const unassignedCase = await Case.findOne({
                where: {
                    status: caseStatus.NEW
                },
                order: [
                    ["createdAt", "ASC"]
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
