import { sign, verify } from "jsonwebtoken"

const secret = process.env.JWT_SECRET || "9u8nnjksfdt98*(&*%T$#hsfjk"
const ttl = 3600 * 4 // our JWT tokens are valid for 4 hours

interface JwtPayload {
  id: number
}

export const signJWT = (data: JwtPayload) => sign({ data }, secret, { expiresIn: ttl })

export const verifyJWT = (token: string): { data: JwtPayload } =>
  verify(token, secret) as { data: JwtPayload }
