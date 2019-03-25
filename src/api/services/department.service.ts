
import Department from "../models/department.model";


export class DepartmentService {

   async create(departmentObj: Department ) {
      return await Department.create(departmentObj);
   }
}
