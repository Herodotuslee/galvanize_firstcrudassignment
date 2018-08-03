const  express        = require('express'),
          app         = express(),
          port        = process.env.PORT || 8000,
          bodyParser  = require('body-parser'),
          fs          = require('fs');

const  data = fs.readFileSync('./storage.json', 'utf-8')
const allUsers= JSON.parse(data);


// MIDDLEWARE
app.use(bodyParser.json());


//SHOW ALL USERS
app.get("/all",function(req,res){

  res.json(JSON.parse(data));
})


//UPLOAD AN USER
app.post("/create", function(req, res){

  let user = req.body.user;
  let name =req.params.name


// FOR CHECKING SAME USER NAME
  function checkUni(){
    for(let i=0;i<allUsers.length;i++){
      if(allUsers[i].name===req.body.user.name){
        console.log('same')
        res.send('User name already exist')
          return;
        }
    }
      allUsers.push(user);
      res.send('No one is same as your name')
    }


  checkUni(allUsers)
  fs.writeFileSync('./storage.json',JSON.stringify(allUsers), allUsers)

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
     return item=user;
   } else{
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


// IF YOUR HTML IS INVALID SENT 404
app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on', port);
});
