const express= require('express')
const app=express()
const mongoose=require('mongoose')
const routes=require('./routes/books')
const URI = require('./config/index');
const path = require('path');
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/api/books',routes)

mongoose
  .connect(process.env.MONGODB_URI || URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));
app.use(express.json());

const PORT=process.env.PORT || 5000


app.listen(PORT,()=>console.log(`listening to port ${PORT} successfuly`))