import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "typeorm/repository/BaseEntity"

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column("text", { nullable: false })
  public firstName: string

  @Column("text", { nullable: false })
  public lastName: string

  @Column("text", { nullable: false })
  public email: string

  @Column("text")
  public city: string
}
