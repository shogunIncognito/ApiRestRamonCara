import app from "./app.js";
import { PORT } from './db/config.js';

app.listen(PORT)
console.log("App hosteada en puerto", PORT);