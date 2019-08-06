import { IsString } from "class-validator"

export class AuthenticatePayload {
  @IsString()
  public email: string

  @IsString()
  public password: string
}
