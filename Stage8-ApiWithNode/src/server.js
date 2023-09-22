const PORT = 3333;

const express = require("express");
const routes = require("./routes/index.js");

const app = express();
// Necessário para api receber os dados em formato JSON por POST
app.use(express.json()); 
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});







// Get - Requisitar por route params
app.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params;
    response.send(`MessageId: ${id}. User: ${user}.`);
});

