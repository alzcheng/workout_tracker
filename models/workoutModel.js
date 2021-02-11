const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        $type: Date,
        default: new Date(new Date().setDate(new Date().getDate()))
    },
    exercises: [{
        type: String,
        name: String,
        duration: Number,
        distance: Number,
        weight: Number,
        reps: Number,
        sets: Number
    }]
}, { typeKey: '$type' });
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout; 