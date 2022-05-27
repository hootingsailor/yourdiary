const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


// ROUTE-1 Get all the notes -> fetchallnotes ("/api/notes/fetchallnotes") [Login required]


router.get('/fetchallnotes', fetchuser, async (req , res) => {
    try {
        // Here I find user with jwt token and fetch notes
        const notes = await Notes.find({user: req.user.id});
        res.json(notes); 
    } catch (error) {
        console.error(error.message);
		res.status(500).send("Internal Server Error");
    }
})


// ROUTE-2 Adds a Note -> addnote ("/api/notes/addnote") [Login required]


router.post('/addnote', fetchuser, [
    // Here I used Express validator
    body('title', 'Enter a valid title').isLength({ min: 3 }),
	body('description', 'Description must be atleast of 5 Character').isLength({ min: 5 }),
], async (req , res) => {
    try {
        const {title, description, tag} = req.body;
        // If error occur retrun bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
		res.status(500).send("Internal Server Error");
    }
})


// ROUTE-3 Update an existing Note -> updatenote ("/api/notes/updatenote") [Login required]


router.put('/updatenote/:id', fetchuser, async (req , res) => {
    const {title, description, tag} = req.body;
    // Create a newNote object
    const newNote = {};
    if(title) {newNote.title = title}; 
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};
    
})

module.exports = router;