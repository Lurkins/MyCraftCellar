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
    const output = `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Simple Transactional Email</title>
        <style>
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
    
    table[class=body] p,
    table[class=body] ul,
    table[class=body] ol,
    table[class=body] td,
    table[class=body] span,
    table[class=body] a {
        font-size: 16px !important;
      }
    
      table[class=body] .wrapper,
    table[class=body] .article {
        padding: 10px !important;
      }
    
      table[class=body] .content {
        padding: 0 !important;
      }
    
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
    
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }
    
      table[class=body] .btn table {
        width: 100% !important;
      }
    
      table[class=body] .btn a {
        width: 100% !important;
      }
    
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
      }
    }
    @media all {
      .ExternalClass {
        width: 100%;
      }
    
      .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
      }
    
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }
    
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
    
      .btn-primary table td:hover {
        background-color: #34495e !important;
      }
    
      .btn-primary a:hover {
        background-color: #ffc107 !important;
        border-color: #34495e !important;
        color: #000000 !important;
      }
    }
    </style>
      </head>
      <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
          <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
              <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
    
                <!-- START CENTERED BLACK CONTAINER -->
                <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #000000; border-radius: 3px; width: 100%;" width="100%">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                        <tr>
                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                            <h1 style="font-family: sans-serif; line-height: 1.4; margin: 0; margin-bottom: 30px; color: #ffffff; font-size: 35px; font-weight: 300; text-align: left; text-transform: capitalize;">Hi MyCraftCellar,</h1>
                            <h3 style="color: #ffc107; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px;">${req.body.name} is interested in ${req.body.beer}.</h3>
                            <p style="color: #ffffff; font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">${req.body.message}</p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                      <tbody>
                                        <tr>
                                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #000000;" valign="top" align="center" bgcolor="#000000"> <a href="https://mycraftcellar.herokuapp.com" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #000000; border-color: #ffc107; color: #ffc107;">Go to MyCraftCellar</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p style="color: #ffffff; font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Cheers!</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
                <!-- START FOOTER -->
                <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                    <tr>
                      <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                        <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">MyCraftCellar, Austin TX</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`

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
// app.post("/signup", function(req, res) {
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.send(err)
//         } else {
//             passport.authenticate("local")(req, res, function(){
//                 res.redirect("/dashboard");
//             });
//         }
//     })
// });

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