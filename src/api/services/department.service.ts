
import Department from "../models/Department.model";


export class DepartmentService {

   async create(departmentObj: Department ) {
      return await Department.create(departmentObj);
   }
}
