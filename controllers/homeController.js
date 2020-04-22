const Subscriber = require("../models/subscriber");

exports.showLogin =  (req, res) => {
    res.render("login");
};
exports.showRegister = (req,res) => {
    res.render("register");
};
exports.showContact = (req,res) => {
res.render("contact");
};

exports.showIndex = (req,res) => {
    res.render("index");
};

exports.showWelcome = (req,res) => {
    res.render("welcome");
};
exports.showUserInfo = (req,res) => {
    
     
        if (req.session.loggedin) {
            Subscriber.find({nickname: req.session.username}, function(error, subscribers)  {
                if(error) next(error);
                req.data = subscribers;
                
            });
            console.log(req.data);
            res.render("userinfo", {username: req.session.username});        
        } else {
            res.render("usernotlogged");
        }
        res.end();
        
}