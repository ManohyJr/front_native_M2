const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const enseignantRoutes = require("./routes/enseignants.routes");

app.use("/enseignants", enseignantRoutes);

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});