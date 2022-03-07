import express from 'express';
import cors from 'cors';
import DB_CONNECTION from './database';
//import initializeConfig from './shared/config';

import routes from './routes/index.routes';

//const env = initializeConfig();
DB_CONNECTION();

const app = express();

app.use(express.json());
app.use(cors());

let PORT = 4001; // 80 - 655NN
const url: string = `http://localhost:${PORT}`;

app.get('/', (request, response) => {
	const { params, query, body } = request;
	console.log({params, query, body});
	response.send({
		success: true,
		message: 'El Servidor se esta ejecutando correctamente!'
	});
});

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`El servidor se esta ejecutando en el puerto ${PORT}, visite: ${url} `);
	console.log(`El ambiente de desarrollo es: ${process.env.NODE_ENV}`)
});