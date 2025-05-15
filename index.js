const express=require('express');
require("dotenv/config");
const cors = require("cors");
const app = express();
const connectDB = require("./mongodb/mongodb.js");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();




//import all routes here.
const gameRouter = require('./routers/gaming.route.js');


app.use('/api/gaming',gameRouter);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});