// GUYS:  I'll delete this whole file or use it later, depending, but it's here for my reference, so leave it for now please!



// We might move auth into it's own file, so this is here as a reference. Just ignore until we get it working in the other file, then we may arrange it more nicely.


// module.exports = function () {
//     const dotenv = require('dotenv');
//     dotenv.config();

//     const express = require('express');
//     const bodyParser = require('body-parser');
//     const bcrypt = require("bcrypt");
//     const jwt = require("jsonwebtoken");

    // const passport = require("passport");
    // const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")

//     const app = express();
//     const PORT = process.env.PORT || 3000;

//     const connection = require("./config/connection");

    // const passportOps = {
    //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     secretOrKey: process.env.JWT_SECRET
    // }

    // passport.use(new JwtStrategy(passportOps, (jwt_payload, done) => {
    //     connection.query("SELECT * FROM users WHERE id = ?", [jwt_payload.id], function (err, results) {
    //         console.log(results);
    //         if (err) {
    //             return done(err, false);
    //         }
    //         if (results.length < 1) {
    //             return done(null, false);
    //         }

    //         done(null, results[0]);
    //     })
    // }));


//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(bodyParser.json());

//     // app.use(express.static("public"));

//     // app.get("/", (req, res) => {
//     //     connection.query("SELECT * FROM users", function (err, results) {
//     //         res.json(results)
//     //     });
//     // });

    // app.post("/api/register", (req, res) => {
    //     if (!req.body.email || !req.body.password) {
    //         return res.json({ success: false, message: "missing username or password" });
    //     }
    //     const { email, password } = req.body;
    //     bcrypt.hash(password, 10, function (err, hash) {
    //         if (err) {
    //             res.json({ success: false, message: "Problem creating account" });
    //         }
    //         connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], function (err, results) {
    //             if (err) {
    //                 res.json({ success: false, message: "Email address is taken" });
    //             }
    //             res.json({ success: true, results: results });
    //         });
    //     });

//     });

//     app.get("/api/private", passport.authenticate('jwt', { session: false }), (req, res) => {
//         console.log(req.user);
//         const { id, email } = req.user;
//         return res.send({ id, email });
//     })

//     app.post("/api/signin", (req, res) => {
//         if (!req.body.email || !req.body.password) {
//             return res.json({ success: false, message: "missing username or password" });
//         }
//         const { email, password } = req.body;
//         connection.query("SELECT * FROM users WHERE email = ?", [email], function (err, results) {
//             if (err) {
//                 return res.json({ success: false, message: "Ran into some issue" });
//             }
//             console.log(results);
//             if (results.length === 0) {
//                 return res.json({ success: false, message: "no user matches that email" });
//             }
//             bcrypt.compare(password, results[0].password, function (err, bcryptResult) {
//                 if (err) {
//                     return res.json({ success: false, message: "password and user did not match" });
//                 } else {
//                     // THIS IS WHERE WE RETURN THE DATA
//                     if (bcryptResult) {
//                         var token = jwt.sign({ id: results[0].id, expires: +Date.now() + 3600000 }, process.env.JWT_SECRET)
//                         return res.json({ success: true, token: token });
//                     } else {
//                         return res.json({ success: false })
//                     }
//                 }
//             });


//         });
//     });
// };


// module.exports = auth;





// SCRAP:


// $.post("/api/signin", { username: username, password: password }, function (response) {
//     console.log("This is the response given from the api/signin on login click action: ", response);
//     console.log("At that time, username: ", username);
//     console.log("At that time, password: ", password);
//     //Do some checking to peak behind the scenes ^^.
        //  localStorage.setItem("token", response.token);
//     // When we get a response from the sign-in request, (which should be the jwt token value), then place the token in the user's storage.
// });




// $("#private").click(function () {
//     $.ajax({
//         url: "/api/private",
//         method: "GET",
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("token")
//         }
//     }).then(function (res) {
//         console.log(res);
//         $("#news").text(JSON.stringify(res));
//     });
// });

// // Have a button added for this, for now just assume we will timeout.
// $("#logout").click(function () {
//     localStorage.setItem("token", "");
//     location.reload();
// });
