const  express = require('express'),
          app = express(),
          port = process.env.PORT || 8000,
          bodyParser = require('body-parser'),
          fs = require('fs');

let data = fs.readFileSync('./storage.json', 'utf-8')
let allUsers= JSON.parse(data);


// MIDDLEWARE
app.use(bodyParser.json());


//SHOW ALL USERS
app.get("/all",function(req,res){

  res.json(JSON.parse(data));
})


//UPLOAD AN USER
app.post("/create", function(req, res){

  let user = req.body.user;

  allUsers.push(user);
  fs.writeFileSync('./storage.json',JSON.stringify(allUsers), allUsers)
  res.sendStatus(200);
})


//GET A USER INFO  BY NAME
app.get("/user/:name",function(req,res){

  let name =req.params.name

  allUsers.forEach((item)=>{
    if(item.name===name){
      res.json(item)
    }else{
      res.send('We can not find this user')
    }
  })
}

)


// UPDATE THE USER
app.put("/update/:name",function(req,res){
  let name =req.params.name
  let user = req.body.user;
  let upDate = allUsers.map(item =>{
   if(item.name === name){
     // console.log('equal')
     return item=user;
   } else{
     // console.log('not equal')
     return item=item;
   }

 })

 fs.writeFileSync("./storage.json", JSON.stringify(upDate));
 res.send("ok")
})


// DELETE ROUTE
app.delete('/users/:name', function(req, res) {

  let deleteUsers = allUsers.filter((item)=>{
    return item.name !== req.params.name;
  });
  fs.writeFileSync('./storage.json', JSON.stringify(deleteUsers));
  res.send("deleted,OK!")
});




app.listen(port, function() {
  console.log('Listening on', port);
});
