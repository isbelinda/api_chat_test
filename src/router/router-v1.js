import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('I use router v1');
});

export default router;