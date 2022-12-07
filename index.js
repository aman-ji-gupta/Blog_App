const express = require("express");
const bodyParser = require("body-parser");
require("./model/config");
const router = require("./routes/commonRoutes");
const app = express();

app.use(bodyParser.json())
app.use(express.json()) 
app.use('/',router);


app.listen(9000,()=>{
    console.log(`server is running at port: 9000`);
})