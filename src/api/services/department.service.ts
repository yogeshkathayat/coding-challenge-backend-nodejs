
import Department from "../models/department.model";


export class DepartmentService {

   async create(departmentObj: Department) {
      try {
         // check if department already exists
         const dept = await Department.findOne({
            where: {
               name: departmentObj.name
            }
         });

         if (dept) throw new Error("department already exists");
         return await Department.create(departmentObj);
      } catch (error) {
         throw error;
      }
   }
}
