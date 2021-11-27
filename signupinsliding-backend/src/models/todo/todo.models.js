const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,   // object id type
        ref: "User"    //User model r sathe relation korthe cay tay ref User 
    }

});

// instance methods
// 1. create a schema from mongoose.Schema class => ekta schema create kory mongoose.Schema class ke use kore.
// 2. create a model (which is another class) from mongoose.model class & pass schema to it. => document er ekta structure create hoi
// 3. create a document using model class   => document structure ke use amra actual document create kory
// 4. call necessary model instance method document => like save method => ex: todo.save()
todoSchema.methods = {
    findActive: function () {
        return mongoose.model("Todo").find({ status: "active" });
    },
    findActiveCallback: function (cb) {
        return mongoose.model("Todo").find({ status: "active" }, cb);
    },
};

module.exports = mongoose.model('Todo', todoSchema)
