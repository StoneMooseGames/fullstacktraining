const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscriberController = require ("./controllers/subScriberController");
const loginController = require("./controllers/loginController");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const app = express();
const axios = require("axios");
const axiosController = require("./controllers/axiosTestController");


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/svs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
app.engine("ejs", require("ejs-locals"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
app.use(session({
	secret: 'kkssjepjep',
	resave: true,
	saveUninitialized: true
})); 
  
//ROUTES
  

app.get("/list", subscriberController.getAllSubscribers, (req, res, next) => { 
  console.log(req.data);
  res.send(req.data);
});
app.post("/registeruser", subscriberController.saveSubscriber);
app.get("/", homeController.showIndex);
app.get("/login", homeController.showLogin);
app.post("/loggingin", loginController.loginInformation);
app.get("/register", homeController.showRegister);
app.get("/contact", homeController.showContact);
app.get("/userinfo", homeController.showUserInfo);
app.get("/logout", loginController.logout);

//ERROR HANDLING
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node running on port ${PORT}`)
});
