export {} // Make the file a module

declare global {
  namespace Express {
    export interface Request {
      stop: () => void
    }
  }
}
