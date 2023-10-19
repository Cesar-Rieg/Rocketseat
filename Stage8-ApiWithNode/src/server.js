const PORT = process.env.PORT || 3000;

require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");
const ApplicationError = require("./utils/ApplicationError.js");
const HttpStatusCode = require("./httpStatusCode/HttpStatusCode.js");
const express = require("express");
const routes = require("./routes/index.js");
const UploadConfig = require("./configs/FileUpload.js");
const DatabaseErrorTranslateServices = require("./services/DatabaseErrorTranslateServices.js");
const _databaseErrorTranslateServices = new DatabaseErrorTranslateServices();

const cors = require("cors");
const app = express();
app.use(cors());
// Necessário para api receber os dados em formato JSON por POST
app.use(express.json());
app.use(routes);
app.use("/files", express.static(UploadConfig.UPLOADS_FOLDER));

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

    return response.status(HttpStatusCode.InternalServerError).json({
        Status: "Error",
        StatusCode: HttpStatusCode.InternalServerError,
        Message: "Internal server error",
        DatabaseError: _databaseErrorTranslateServices.GetDatabaseError(error)
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
