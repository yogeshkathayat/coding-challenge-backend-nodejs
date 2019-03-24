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
  DepartmentId: number;

  @BelongsTo(() => Department)
  Department: Department;

  @ForeignKey(() => Case)
  @Column
  CaseId: number;

  @BelongsTo(() => Case)
  Case: Case;
}
