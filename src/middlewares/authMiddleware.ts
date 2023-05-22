import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface TokenPayLoad {
  id: string
  iat: number
  exp: number
}

export default function verifyJWT(req: Request, res: Response, next: NextFunction) {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      message: 'Token Invalido!'
    })
  }

  const token = authorization.replace('Bearer ', '').trim()

  try {
    const data = jwt.verify(token, 'secret')
    const { id } = data as TokenPayLoad
    // req.userId = id_usuario
    // console.log(id)
    return next()

  } catch (error) {
    return res.status(401).json({ message: "Erro na verificação do Token!" })
  }

}