import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router/mainRouter';

const app = express();
const PORT = process.env.PORT || 3004;
const routeName = '/api';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routeName, router);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`); 
});