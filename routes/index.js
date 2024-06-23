
const ContactosController = require("../controllers/ContactosController");
const contactosController = new ContactosController();
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv').config();
require('dotenv').config()
const user = process.env.USER;
const pass = process.env.PASS;
const TOKEN3 = process.env.ID_CLIENTE;
const TOKEN4 = process.env.SECRETO_KEY;
const GoogleStrategy = require('passport-google-oauth20').Strategy
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hola Mundo',
nomb: ':Jean David', 
apel: ':Torres Arteaga',
id: ':31562484',
secc: '2',});
});

router.get('/login', (req, res) => {
  res.render('login');
});


router.post("/form-contacto", contactosController.add);



const PassportLocal = require('passport-local').Strategy;

passport.use(new PassportLocal(function(username, password, done){
 if (username === user && password === pass)
return done(null,{id: 1, name: " aaa "});

done (null, false);
}));

// Serialización
passport.serializeUser (function(user,done){
done (null, user. id);
})
// Deserialización
passport.deserializeUser(function(id, done){
  done (null, {id: 1, name: " aaa " });
  })

router.post('/login', passport.authenticate('local', {
  successRedirect: '/Contactos',
  failureRedirect: '/login'
}));

router.get('/Contactos',isLoggedIn, contactosController.list);

router.get('/Contactos',(req, res)=>{
  res.render('Contactos');
})
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/Login');

}

// Autenticación con Google //
passport.use(new GoogleStrategy({
  clientID: TOKEN3,
  clientSecret: TOKEN4,
  callbackURL: "http://127.0.0.1:3000/auth/google/Contactos"
},
function(accessToken, refreshToken, profile, done) {
    return done (null, profile);
  }
));


// 1 = Serialización //
passport.serializeUser (function(user,done){
done (null, user. id);
})
// Deserialización //
/*passport.deserializeUser(function(id, done){
  done (null, {id: 1, name: user});
  })
*/

passport.deserializeUser(function(id, done) {
  const user = { id: 1, username: user };
  done(null, user);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});





module.exports = router;
