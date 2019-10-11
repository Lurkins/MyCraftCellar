const express = require('express');
const app = express();

const mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");

const nodemailer = require('nodemailer');

require('dotenv').config()

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/beer_cellar';

mongoose.connect(mongoUrl, {useNewUrlParser: true})
.then(function(returnedData){
    console.log("Connected to Mongo dB at ", mongoUrl);
})
.catch(function(err){
    console.log("could not connect to the database ", err);
    process.exit();
})

app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

var User = require("./models/user");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let beerSchema = mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Beer brand is required']
    },
    description: {
        type: String,
        required: [true, 'Beer name is required']
    },
    year: {
        type: String,
        required: [false, 'Beer year is required']
    },
    isDrunk: {
        type: Boolean,
        default: false
    }, 
    quantity: {
        type: String,
        default: "1",
        required: [true, 'Beer quantity is required']
    }
});

let BeerModel = mongoose.model('Beers', beerSchema);

app.use(express.static('frontend'));

//Serve index page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/frontend/index.html');
});

//Serve dashboard page
app.get('/dashboard', isLoggedIn, function(req, res){
    res.sendFile(__dirname + '/frontend/dashboard.html');
});

//Send email
app.post('/send', function(req, res, next) {
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAILPORT,
        secure: process.env.SECURE,
        auth: {
            type: process.env.TYPE,
            user: process.env.MAILUSER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        }
    });
    const output = `
        <div style="width: 100%; height: 100%; background-color: gold; padding: 60px; ">
        <h1>Hey CraftCellar,</h1>
        <h2 style="color: blue">${req.body.name} is interested in ${req.body.beer}.</h2>
        <h3>Here is their message:</h3>
        <p>${req.body.message}</p>
        </div>
        `
    const mailOptions = {
      from: `${req.body.email}`,
      to: 'craftcellarbeerme@gmail.com',
      subject: `${req.body.beer}`,
      html: output,
      replyTo: `${req.body.email}`
    }
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        res.send({
            type: 'danger',
            msg: 'There was an error sending your message.'
          });
        console.error('There was an error: ', err);
      } else {
        console.log("info.messageId: " + info.messageId);
        console.log("info.envelope: " + info.envelope);
        console.log("info.accepted: " + info.accepted);
        console.log("info.rejected: " + info.rejected);
        console.log("info.pending: " + info.pending);
        console.log("info.response: " + info.response);
        res.send({
            type: 'success',
            msg: "Message sent! I'll email you back as soon as I can."
          });
      }
      transporter.close();
    })
  })

//Sign up - POST
app.post("/signup", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.send(err)
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dashboard");
            });
        }
    })
});

//Login - POST
app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/dashboard');
        });     
    })(req, res, next);
  });

//Logout - get
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//logged in check
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}


// READ - GET
app.get('/beer', function(req, res){
    BeerModel.find({}, (err, beers) => {
        if(err){
            console.log('Error: ', err);
            res.statusCode(400).send({code: 1234, message: 'Error: ' + err});
        };
        res.send(beers);
    }).sort({brand: 1})
});

//SORT BEERS BY AGE
app.get('/beer/age', function(req, res){
    BeerModel.find({}, (err, beers) => {
        if(err){
            console.log('Error: ', err);
            res.statusCode(400).send({code: 1234, message: 'Error: ' + err});
        };
        res.send(beers);
    }).sort({year: 1}).collation({locale: "en_US", numericOrdering: true})
});

//SORT BEERS BY NAME
app.get('/beer/name', function(req, res){
    BeerModel.find({}, (err, beers) => {
        if(err){
            console.log('Error: ', err);
            res.statusCode(400).send({code: 1234, message: 'Error: ' + err});
        };
        res.send(beers);
    }).sort({description: 1})
});

//SORT BEERS BY BRAND
app.get('/beer/brand', function(req, res){
    BeerModel.find({}, (err, beers) => {
        if(err){
            console.log('Error: ', err);
            res.statusCode(400).send({code: 1234, message: 'Error: ' + err});
        };
        res.send(beers);
    }).sort({brand: 1})
});

//SORT BEERS BY QUANTITY
app.get('/beer/quantity', function(req, res){    
    BeerModel.find({}, (err, beers) => {
        if(err){
            console.log('Error: ', err);
            res.statusCode(400).send({code: 1234, message: 'Error: ' + err});
        };
        res.send(beers);
    }).sort({quantity: -1}).collation({locale: "en_US", numericOrdering: true})
});

//CREATE - POST
app.post('/beer', function(req, res){
    BeerModel.create(req.body, function(err, newBeer) {
        if(err) { 
            res.statusCode(400).send({code: 1236, message: 'Error posting' + err});
        };
        res.status(201).send(newBeer);
    })
});

//UPDATE - PUT
app.put('/beer/:beerid', function(req, res){
    BeerModel.findById(req.params.beerid, function(err, beer) {
        if(err) {
            res.status(400).send({
                code: 1236,
                message: 'There is an error finding item with matching id'
            });
        } else {
            if(beer && beer.quantity !== undefined) {
                beer.quantity++;
                beer.save(function(err, returnedBeer){
                    if(err) res.send({code: 123, message: 'Hallelujah', err:err})
                    res.send(returnedBeer);
                })
            }
        }
    }); 
});

//DELETE
app.delete('/beer/:beerid', function(req, res){
    BeerModel.findById(req.params.beerid, function(err, beer) {
        if(err) {
            res.status(400).send({
                code: 1237,
                message: 'There is an error finding item with matching id'
            });
        } else {
            if(beer && beer.quantity > 1 ) {
                beer.quantity--;
                beer.save(function(err, returnedBeer){
                    if(err) res.send({code: 123, message: 'Hallelujah', err:err})
                    res.send(returnedBeer);
                })
            } else {
                BeerModel.findByIdAndDelete(req.params.beerid, function(err, beer){
                    if(err){
                        res.status(400).send({
                            code: 1234,
                            message: 'There is an error finding item with matching id',
                            err: err
                        })
                    } else {
                        res.send();
                    }
                });
            }
        }
    }); 
});



app.listen(`${port}`, function(){
    console.log(`This app is listening on port ${port}`);
});
//export for testing
// module.exports = app