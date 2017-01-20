import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('I use router v2');
});

export default router;