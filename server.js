const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const trips = require('./routes/api/trips');
const friendrequests = require('./routes/api/friendRequests');

const app = express();

/*
var corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
*/
app.use(cors());
//Setup CORS header for localhost:3000
/*
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, OPTIONS" 
  );
  res.header(
    "Content-Type",
    "application/json"
  );
  next();
})
*/

//BodyParser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false 
  })
);
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(
  db, {useNewUrlParser: true}
)
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users/', users);
app.use('/api/trips/', trips);
app.use('/api/friendrequests/', friendrequests)

//Setup port and get server to listen
const port = process.env.PORT || 5000; //process.env is for deployment

app.listen(port, '0.0.0.0', () => console.log('Server is running on port ' + port + '.'));
