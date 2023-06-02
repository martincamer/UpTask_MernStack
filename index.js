import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectosRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/TareaRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//configurar cors
const whitelist = [process.env.FRONTEND_URL];

//Cors Options
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.includes(origin)) {
			//puede consultar la api
			callback(null, true);
		} else {
			//no esta permitido su request
			callback(new Error('Error de Cors'));
		}
	},
};
//use cors
app.use(cors(corsOptions));

//routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
