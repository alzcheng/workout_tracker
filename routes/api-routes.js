const { Workout } = require("../models");
const db = require("../models");

//Routes
module.exports = (app) => {

    //Route for getting the last workout 
    app.get("/api/workouts", (req, res) => {
        //When getting the workouts, add the totalDuration field so that the 
        //last entry has that field for the display. 

        Workout.aggregate().addFields({ totalDuration: { $sum: "$exercises.duration" } })
            .sort({ day: 1 })
            .then(allWorkouts => {
                res.send(allWorkouts);
            })


    })

    //Route for getting the latest 7 workouts
    app.get("/api/workouts/range", (req, res) => {
        Workout.aggregate().addFields({ totalDuration: { $sum: "$exercises.duration" } })
            //sort in descending order    
            .sort({ day: -1 })
            //getting the last 7 entries
            .limit(7)
            .then(workouts => {
                res.send(workouts);
            });
    });

    //matching up with createWorkout
    app.post("/api/workouts", async ({ body }, res) => {
        console.log("working in routes")
        const workout = new Workout(body);
        Workout.create(body)
            .then(workout => {
                res.send(workout);
            })
    })

    //Update a new workout
    app.put("/api/workouts/:id", (req, res) => {

        const newExercise = {};
        newExercise.type = req.body.type;
        newExercise.name = req.body.name;
        newExercise.duration = req.body.duration;
        newExercise.distance = req.body.distance;
        newExercise.weight = req.body.weight;
        newExercise.reps = req.body.reps;
        newExercise.sets = req.body.sets;

        Workout.updateOne({ _id: req.params.id }, { $push: { exercises: newExercise } })
            .then(newWorkout => {
                res.send(newWorkout);
            })
    });

};

