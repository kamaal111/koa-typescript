import { compare, hash } from "bcrypt"
import { Exclude } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "typeorm/repository/BaseEntity"

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  public firstName: string

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  public lastName: string

  @IsEmail()
  @Column("text", { nullable: false })
  public email: string

  @IsString()
  @MinLength(3)
  @Column("text")
  public city: string

  @IsString()
  @MinLength(8)
  @Exclude({ toPlainOnly: true })
  @Column("text", { nullable: true })
  public password: string

  public async setPassword(rawPassword: string) {
    const hashPassword = await hash(rawPassword, 10)
    this.password = hashPassword
  }

  public checkPassword(rawPassword: string): Promise<boolean> {
    return compare(rawPassword, this.password)
  }
}
