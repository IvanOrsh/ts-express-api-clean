import { type Router, type Request, type Response } from 'express'

export default (router: Router): void => {
  router.post('/signup', (req: Request, res: Response) => {
    res.json({
      ok: 'ok'
    })
  })
}
