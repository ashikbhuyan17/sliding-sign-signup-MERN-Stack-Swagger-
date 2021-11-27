
const jwt = require('jsonwebtoken');
const checkLogin = (req, res, next) => {
    // console.log("header", req.headers, req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(400).json({ message: "Authenticate Required header" });
    } else {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("decoded", req.decoded);
            // console.log(
            //     decoded
            // );
            const { email, _id } = decoded;
            req.decoded = decoded;
            req.email = email;
            req._id = _id;
            next()

        } catch (err) {
            res.status(400).json({ message: "Authenticate failure" });
            next("Authentication failure!");
        }


    }
}

// const jwt = require("jsonwebtoken");

// const checkLogin = (req, res, next) => {
//     const { authorization } = req.headers;
//     try {
//         const token = authorization.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const { username, userId } = decoded;
//         req.username = username;
//         req.userId = userId;
//         next();
//     } catch(err) {
//         next("Authentication failure!");
//     }
// };

// module.exports = checkLogin;


// const checkLogin = (req, res, next) => {
//     // console.log("header", req.headers, req.headers.authorization);
//     if (!req.headers.authorization) {
//         return res.status(400).json({ message: "Authenticate Required header" });
//     } else {

//         const token = req.headers.authorization.split(" ")[1];
//         // console.log(token);
//         if (token) {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
//             // console.log("user", req.user);
//             // console.log(
//             //     user
//             // );
//             const { email, _id } = decoded;
//             req.decoded = decoded;
//             req.email = email;
//             req._id = _id;

//         } else {
//             return res.status(400).json({ message: "Authenticate Required" });

//         }
//     }
//     next()
// }


module.exports = {
    checkLogin
}