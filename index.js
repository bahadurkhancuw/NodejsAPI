let express = require('express');
let app = express();
var port = 8080;
let bodyparser = require('body-parser');
let mongoose = require('mongoose');

const cors = require("cors");



app.get('/',(req, res)=>{
    res.send("testing");
})
app.listen(port, function(){
    console.log("Running on port");
})
let apiroutes = require("./router")
app.use(cors({
    origin: '*'
}))
app.use('/api', apiroutes);



app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(bodyparser.json);

// connecting to mongoose
const dbPath = 'mongodb://127.0.0.1:27017/mydb';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})