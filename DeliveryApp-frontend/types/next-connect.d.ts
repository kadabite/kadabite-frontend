declare module 'next-connect' {
  import { NextApiRequest, NextApiResponse } from 'next';
  import { IncomingMessage, ServerResponse } from 'http';

  type Middleware<TReq = NextApiRequest, TRes = NextApiResponse> = (
    req: TReq,
    res: TRes,
    next: (err?: any) => void
  ) => void;

  interface NextConnect<TReq = NextApiRequest, TRes = NextApiResponse> {
    use(...fn: Middleware<TReq, TRes>[]): this;
    get(...fn: Middleware<TReq, TRes>[]): this;
    post(...fn: Middleware<TReq, TRes>[]): this;
    put(...fn: Middleware<TReq, TRes>[]): this;
    delete(...fn: Middleware<TReq, TRes>[]): this;
    patch(...fn: Middleware<TReq, TRes>[]): this;
    options(...fn: Middleware<TReq, TRes>[]): this;
    head(...fn: Middleware<TReq, TRes>[]): this;
    handler(req: IncomingMessage, res: ServerResponse): void;
  }

  export default function nextConnect<TReq = NextApiRequest, TRes = NextApiResponse>(): NextConnect<TReq, TRes>;
}
