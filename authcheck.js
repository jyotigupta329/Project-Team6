const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")



// var checkAuth = function() {

// var currentToken = localStorage.getItem(token);

// if ( typeof currentToken !== "string" ){
//     throw err;
// } else if (currentToken === " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwaXJlcyI6MTUzOTM5Mzg5NDc2NSwiaWF0IjoxNTM2ODAxODk0fQ.W_JBkKftJsZD2MYlfFg73IcUsYdjg3JPBxvSO8HPxDc " ){
//     alert("MATCH BITCH.");
// } else {
//     return console.log("Not authorized.");
// }








// };

// module.exports = checkAuth();