const Subscriber = require("../models/subscriber");


exports.getAllSubscribers = function(req,res, next) {
    Subscriber.find({}, function(error, subscribers)  {
        if(error) next(error);
        req.data = subscribers;
        next();
    });
};

exports.saveSubscriber = (req,res) => {
    let newSubsscriber = new Subscriber ( {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, //TODO make sure this is safe to use in the future
        nickname: req.body.nickname
        
    });

    newSubsscriber.save().then( () => {
        res.render("welcome");
    })
        .catch(error => {
        res.render("registerError");
    });
};