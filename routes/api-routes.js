const { Workout } = require("../models");
const db = require("../models");

//Routes
module.exports = (app) => {

    //Route for getting the last workout 
    app.get("/api/workouts", (req, res) => {
        Workout.find({}).then(allworkouts => {
            res.send(allworkouts);
        })

    })

    //matching up with createWorkout
    app.post("/api/workouts", async ({ body }, res) => {
        console.log("working in routes")
        const workout = new Workout(body);
        Workout.create(body)
            .then(workout => {
                console.log(workout);
                res.send(workout);
            })
    })

    //Update a new workout
    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.params.id);
        const updatedWorkout = {};
        const exercise = {};
        const myExercises = [];
        exercise.type = req.body.type;
        exercise.name = req.body.name;
        exercise.duration = req.body.duration;
        exercise.weight = req.body.weight;
        exercise.reps = req.body.reps;
        exercise.sets = req.body.sets;
        myExercises.push(exercise);
        updatedWorkout.date = Date.now();
        updatedWorkout.exercises = myExercises;

        console.log(updatedWorkout);


        Workout.updateOne({ _id: req.params.id }, updatedWorkout)
            .then(newWorkout => {
                res.send(newWorkout);
            })
    });

};