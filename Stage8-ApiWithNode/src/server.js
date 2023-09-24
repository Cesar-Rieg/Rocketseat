const PORT = 3333;

require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const ApplicationError = require("./utils/ApplicationError.js");
const express = require("express");
const routes = require("./routes/index.js");

const app = express();
// Necessário para api receber os dados em formato JSON por POST
app.use(express.json());
app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {
    if(error instanceof ApplicationError){
        return response.status(error.StatusCode).json( {
            Status: "Error",
            StatusCode: error.StatusCode,
            Message: error.Message
        })
    }

    console.error(error);

    return response.status(500).json({
        Status: "Error",
        StatusCode: 500,
        Message: "Internal server error"
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});







// Get - Requisitar por route params
app.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params;
    response.send(`MessageId: ${id}. User: ${user}.`);
});
