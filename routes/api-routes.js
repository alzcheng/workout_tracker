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

    // //Update a new workout
    // app.put("/api/workouts/:id", async (req, res) => {

    //     Workout.updateOne({ _id: req.params.id },
    //         {
    //             day: thisDate,
    //             exercises: [{
    //                 type: req.body.type,
    //                 name: req.body.name,
    //                 duration: req.body.duration,
    //                 weight: req.body.weight,
    //                 reps: req.body.reps,
    //                 sets: req.body.sets
    //             }]
    //         }
    //     ).then(newWorkout => {
    //         res.send(newWorkout);
    //     })
    // });

};