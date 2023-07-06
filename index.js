const express = require("express");
const routerApi = require("./routes");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* Este middleware se usa para poder recibir archivos json */
app.use(express.json());
app.use(cors());

routerApi(app);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
