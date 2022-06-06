// BUILD YOUR SERVER HERE
const express = require("express");

const User = require("../api/users/model")

const server = express();

server.use(express.json());

module.exports = server; // EXPORT YOUR SERVER instead of {}

server.get("/api/users", (req, res) => {
    User.find()
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            message: "The users information could not be retrieved",
        })
    })
})

server.get("/api/users/:id", (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else {
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({message: "The user information could not be retrieved"})
    })
})

server.post("/api/users", (req, res) => {
    let user = req.body
        if(!user.name || !user.bio) {
            res.status(400).json({message:"Please provide name and bio for the user"})
        }else {
            User.insert(user)
            .then(insertedUser => {
                    res.status(201).json(insertedUser)
            })
            .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database",
                
            })
        })
            
        }
    })

server.delete("/api/users/:id", (req, res) => {
    User.remove(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({message: "The user could not be removed"})
    })
})

server.put("/api/users/:id", async (req, res) => {
    let id = req.params.id
    let user = req.body

    User.update(id, user)
    .then(updatedUser => {
        if (!updatedUser) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            if (!updatedUser.name || !updatedUser.bio) {
                res.status(400).json({message: "Please provide name and bio for the user"})
            }else {
                res.status(200).json(updatedUser)
            }
        }
    }).catch(err => {
        res.status(500).json({message: "The user information could not be modified"})
    })
})
