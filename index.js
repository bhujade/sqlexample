const mysql = require("mysql2");
const { faker } = require('@faker-js/faker');
const express = require("express");
const app = express();
const path = require ("path");
const methodoverride = require("method-override");

app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended:true}));

app.set("view engine" ," ejs");
app.set("views ",path.join(__dirname,"/views"))

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "data11",                   //it is  not a conection name it is database name
  password: "mayur",                    //main pass
});
let  getRandomUser = () =>  {
  return [
   faker.string.uuid(),
     faker.internet.userName(),
     faker.internet.email(),
    
     faker.internet.password(),
   
  ]};



  //count
  app.get("/",(req,res)=>{

    let q = `select count(*) from user`;
    try {
      connection.query(q,(err, result) => {
        if (err) throw err;
      let count = result[0] ["count(*)"];
        res.render("home.ejs",{count});
      });
    } catch (err) {
      console.log(err);
      res.send("some error in db")
    }
    
  })

  //show route
  app.get("/user",(req,res)=>{
    let q = `select * from user`;

    try {
      connection.query(q,(err, users) => {
        if (err) throw err;
      
        res.render("showusers.ejs",{users});
      });
    } catch (err) {
      console.log(err);
      res.send("some error in db")
    }

  })

   //edit route
   app.get("/user/:id/edit",(req,res) => {
    let {id} = req.params;
    let q = `select * from user where id = '${id}'`;

    try {
      connection.query(q,(err, result) => {
        if (err) throw err;
        let user = result [0];

        res.render("edit.ejs",{user});
      
      });
    } catch (err) {
      console.log(err);
      res.send("some error in db")
    }

   });
 // update (db) route 
   app.patch("/user/:id", (req,res) =>{
    let {id} = req.params;
    let { name : newusername,  password:formpass} = req.body;
    let q = `select * from user where id = '${id}'`;

    try {
      connection.query(q,(err, result) => {
        if (err) throw err;
        let user = result [0];
        if(formpass != user.password){
          res.send("wrong password");
        }else{
          let q2 = `update user set name ='${newusername}' where id ='${id}' `;

          connection.query(q2,(err,result)=>{
            if(err) throw err;
            res.redirect ("/user");
          });
        }

       
      
      });
    } catch (err) {
      console.log(err);
      res.send("some error in db")
    }
  });

  app.listen("8080",()=>{
    console.log("server is listening to port 8080")
  });




