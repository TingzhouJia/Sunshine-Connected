import express from 'express'
import next from 'next'
import nextI18NextMiddleware from "next-i18next/middleware";

import {nextI18next} from './i18n'

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();


(async () => {
  await app.prepare();
  const server = express();
  server.use(nextI18NextMiddleware(nextI18next));

 

  // handle any other requests
  server.get("*", (req, res) => {
   
    return handle(req, res);
  });

  server.listen(port);
  //console.log(`> Ready on port ${port}`)
})();
