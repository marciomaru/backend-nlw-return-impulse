import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

/*
forma de assegurar que apenas 
Frontends validos consumam nossa
api / aplicação
*/
app.use(cors());
/*
em produção ficaria assim:
app.use(cors({
    origin:{'endereço do Frontend permitido'}
}));
*/
app.use(express.json());
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
    console.log('http server running!');
});