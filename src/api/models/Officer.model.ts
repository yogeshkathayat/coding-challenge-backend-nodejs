import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";

import  Department  from "./Department.model";
import  Case  from "./Case.model";


@Table({
  timestamps: true
})
export default class Officer extends Model<Officer> {


  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => Department)
  @Column
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @ForeignKey(() => Case)
  @Column
  caseId: number;

  @BelongsTo(() => Case, { constraints: false })
  case: Case;
}
