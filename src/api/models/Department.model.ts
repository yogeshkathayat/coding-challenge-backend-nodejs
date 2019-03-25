import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  PrimaryKey
} from "sequelize-typescript";
import  Officer  from "./Officer.model";

@Table({
  timestamps: true
})
export default class Department extends Model<Department> {

  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @HasMany(() => Officer)
  officers: Officer[];
}
