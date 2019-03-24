import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";

import { Department } from "./department.model";
import { Case } from "./case.model";


@Table({
  timestamps: true
})
export class Officer extends Model<Officer> {


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

  @BelongsTo(() => Case)
  case: Case;
}
