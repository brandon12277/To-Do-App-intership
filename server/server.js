const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app = express();


const port = 5000;



app.use(cors());
app.use(bodyParser.json());
user={}


app.post("/createuser",(req,res)=>{
  username = req.body.user
  if(user[username])return res.json(404)
  user[username]=[]

  return res.json(username)
  

});
app.post("/displayuser",(req,res)=>{
  username = req.body.user
  if(user[username])return res.json(username)
  else
  return res.json(404)

  
});

app.get("/getTasks",(req,res)=>{
  username = req.query.user
  if(user[username])return res.json(user[username])
  else
  return res.json(404)
})

app.post("/addTask",(req,res)=>{
  task = req.body.task
  username = req.query.user
  if(user[username]){
    user[username].push(task)
    return res.json(user[username])
  }
})
app.post('/deleteTask',(req,res)=>{
  task = req.body.task
  username = req.query.user
  if(user[username]){
    let id  = user[username].indexOf(task)
    user[username].splice(id,1)
    return res.json(user[username])
  }
})






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
