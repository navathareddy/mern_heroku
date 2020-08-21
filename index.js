const express= require('express')
const app=express()
const mongoose=require('mongoose')
const routes = require('./routes');
const URI = require('./config/index');

app.use(express.json())

app.use(express.static('client/build'));
app.use(routes);

mongoose
  .connect(process.env.MONGODB_URI || URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));
app.use(express.json());

const PORT=process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send('hello I am MERN')
})

app.listen(PORT,()=>console.log(`listening to port ${PORT} successfuly`))