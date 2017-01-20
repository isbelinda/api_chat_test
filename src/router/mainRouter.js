import express from 'express';
const router = express.Router();

import routerVersion1 from './router-v1';
import routerVersion2 from './router-v2';

router.use((req, res, next) => {
   switch (req.headers.api_version){
      case "1.0":
         routerVersion1(req, res, next);
         break;

      case "2.0":
         routerVersion2(req, res, next);
         break;
   }
});

export default router;