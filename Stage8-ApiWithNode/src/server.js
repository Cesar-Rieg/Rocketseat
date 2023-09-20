const PORT = 3333;

const express = require("express");

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});


app.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params;
    response.send(`MessageId: ${id}. User: ${user}.`);
});