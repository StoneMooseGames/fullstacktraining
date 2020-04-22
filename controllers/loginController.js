const mongoose = require("mongoose");
const userModel = require("../models/subscriber");
var express = require('express');
var session = require('express-session');



exports.loginInformation = (req,res) => {
       var password = req.body.password;
       var nickname = req.body.nickname;

        if(nickname && password) {
            userModel.findOne({nickname: req.body.nickname}, "password",  (error, user) =>{
                if(error) return console.error(error);
                if(user.password == password) {
                    console.log(req.body.nickname + " is logged in with password: " + user.password);
                    req.session.loggedin = true;
                    req.session.username = req.body.nickname;
                    res.render("userlogged",{username: req.session.username});
                }else res.render("loginerror");
            }
        )} else {
            res.render("loginerror");
            res.end();
        }  
    
}

exports.logout = (req,res) => {
    req.session.loggedin = false;
    res.render("loggedout");
}

        

   
