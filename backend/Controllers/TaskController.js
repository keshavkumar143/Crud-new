const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.send(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.saveTask = (req, res) => {
    const { task } = req.body;

    TaskModel.create({ task })
        .then((data) => {
            console.log("Saved Successfully");
            res.status(201).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Something went wrong");
        });
};

module.exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    TaskModel.findByIdAndUpdate(id, { task })
        .then(() => {
            res.send("Updated");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Something went wrong");
        });
};

module.exports.deleteTask = (req, res) => {
    const { id } = req.params;

    TaskModel.findByIdAndDelete(id)
        .then(() => {
            res.send("Deleted");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Something went wrong");
        });
};
