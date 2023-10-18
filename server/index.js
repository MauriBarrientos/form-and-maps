// Imports the dependencies
import { fileURLToPath} from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ejs from 'ejs';
import path from "path";


import { environments } from "./src/config/environments.js";
import { connectToDatabase } from "./src/config/db.js";
import {travelRouter} from "./src/routes/travel.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();



const app = express();

// Middleware
app.use(express.json())
//Serve static files from the public directory
app.use('/js',express.static(path.join(__dirname, '../client/public/js')));

//Set the views directory for rendering ejs templates
app.set('views',(path.join(__dirname, '../client/public/views')));
app.set('view engine', 'ejs');

// Routes

app.get('/', (req, res) => {
    res.render('travelRequest');
});
// app.use('/', indexRouter);
app.use('/travel', travelRouter);
// Starting the server
app.listen(environments.PORT, async () => {
    console.log(`server on port http://localhost:${environments.PORT}`)
    connectToDatabase()
});