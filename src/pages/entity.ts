import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "typeorm/repository/BaseEntity"

@Entity()
export default class Page extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column("text", { nullable: false })
  public title: string

  @Column("text", { nullable: false })
  public content: string
}
