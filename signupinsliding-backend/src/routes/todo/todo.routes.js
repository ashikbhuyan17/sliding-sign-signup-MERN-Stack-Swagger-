const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Todo = require("../../models/todo/todo.models");
const { checkLogin } = require("../../../src/common-middleware/checkLogin")

// GET ALL THE TODO's
router.get("/", checkLogin, (req, res) => {
    Todo.find({})
        .populate("user")
        // .populate("user", "email firstName userName -_id")   => (minus -) add korle ( - _id) oigula dekhabe na 
        // .select({
        //     _id: 0,
        //     __v: 0,
        //     date: 0,
        // })
        // .limit(2)
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: "Success",
                });
            }
        });
});


// GET ACTIVE TODO'S with asynchronous => uses instance methods
// use asynchronous 
router.get("/active", async (req, res) => {
    //first create new document thn todo diye findActive() method ke call dbo => 3rd step
    // const todo = new Todo();
    // const data = await todo.findActive();  //4th step => call necessary model instance method 
    // res.status(200).json({
    //     data,
    // });
    try {
        const todo = new Todo();
        const data = await todo.findActive();  //4th step => call necessary model instance method 
        res.status(200).json({
            data,
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});




// GET ACTIVE TODO'S with callback => uses instance methods
router.get("/active-callback", (req, res) => {
    const todo = new Todo();
    todo.findActiveCallback((err, data) => {
        res.status(200).json({
            data,
        });
    });
});




// GET A TODO by ID
router.get("/:id", async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id });
        res.status(200).json({
            result: data,
            message: "Success",
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

// POST A TODO with call back
router.post("/", (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Todo was inserted successfully!",
                data,
            });
        }
    });
});

// POST A TODO with asynchronous
router.post('/population', checkLogin, async (req, res) => {
    console.log(req._id);



    try {
        const newTodo = new Todo({
            ...req.body,
            user: req._id,

        });
        await newTodo.save();
        res.status(200).json({
            message: "Todo was inserted successfully!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
})


// POST MULTIPLE TODO
router.post("/all", (req, res) => {
    Todo.insertMany(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Todo's were inserted successfully!",
                data,
            });
        }
    });
});



// PUT TODO
router.put("/:id", (req, res) => {
    let status = req.body.status
    Todo.findByIdAndUpdate({ _id: req.params.id },
        {
            $set: {
                status: status
            },
        },
        {
            new: true,
            useFindAndModify: false,
        },

    ).exec((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        }
        if (data) {
            res.status(200).json({
                message: "Todo's were inserted successfully!",
                data,
            });
        }
    })
})

// DELETE TODO
router.delete("/:id", (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Todo was deleted successfully!",
            });
        }
    });
});

module.exports = router;
