import { Response, Request, NextFunction } from 'express'
import MemoryUsage from './memoryUsage'

export function MemoryUsageMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  global.gc?.()
  const stop = MemoryUsage.Start()
  req.stop = stop
  next()
}
