import { IsString, Length, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "typeorm/repository/BaseEntity"

@Entity()
export default class Page extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number

  @IsString()
  @Length(5, 25)
  @Column("text", { nullable: false })
  public title: string

  @IsString()
  @MinLength(10)
  @Column("text", { nullable: false })
  public content: string
}
