var express = require('express');
var router = express.Router();
const Login = require('../model/login');


/* register */
router.post('/user/register', function (req, res, next) {
  //.......Algoritmo
  //res.send("Respuesta del algorimo")
  let insert = {_id:req.body.email, name: req.body.name, firstName: req.body.firstname, email:req.body.email , password:req.body.password, isAdmin : false}
  var model = new Login(insert);
  model.save(function (err){
    if(err) return console.log(err);
  });
  //alert("Usuario registrado")
  res.send(insert);
});
/*  */

/* GET home page. */
router.get('/', function (req, res, next) {
  //.......Algoritmo
  //res.send("Respuesta del algorimo")
  res.render('index');
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});


router.post("/login", async function (req, res, next) {
  //console.log(req.body);
  if (req.body.email !== "" && req.body.pass !== "") {
    //Validar a la base de datos el usuario y la contraseña
    let login = await Login.aggregate([{$match:{email:req.body.email, password: req.body.pass}}]);
    // console.log(login);
    /*/if (req.body.user == "crojas" && req.body.pass == "26394")
      res.json({ status: 1, mssg: "Login Exitoso!" });
    else
      res.json({ status: -1, mssg: "Login Fallido!" });/*/

    if (login.length > 0) {
      // console.log(login);
      req.session.nombre = login[0].name;
      req.session.email = login[0].email;
      req.session.firstName = login[0].firstName;
      req.session.isAdmin = login[0].isAdmin;
      res.json({ status: 1, mssg: "Login Exitoso!", secret: req.session });
    } else
      res.json({ status: -1, mssg: "Login Fallido!" });
  } else {
    res.json({ status: -1, mssg: "Login Fallido!" });
  }


});

module
.exports = router;
