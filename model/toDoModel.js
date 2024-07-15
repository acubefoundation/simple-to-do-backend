const mongoose = require('mongoose')

const toDoSchemea = new mongoose.Schema({
    todo: String,
    status: {
        type: Boolean,
        default: false

    }
})
const ToDoModel = mongoose.model("to-do-lists", toDoSchemea)

module.exports = ToDoModel