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
import { DataType } from "sequelize-typescript";
import { Officer } from "./officer.model";



@Table({
  timestamps: true
})
export class Case extends Model<Case> {


  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @AllowNull(false)
  @Column
  license: string;

  @AllowNull(false)
  @Column
  color: string;

  @AllowNull(false)
  @Column
  type: string;

  @AllowNull(false)
  @Column
  owner: string;

  @AllowNull(false)
  @Column
  dateOfTheft:Date;

  @AllowNull(false)
  @Column
  theftDescription: string;

  @AllowNull(false)
  @Column
  status: string;

  @ForeignKey(() => Officer)
  @Column
  OfficerId: number;

  @BelongsTo(() => Officer)
  Officer: Officer;

}
