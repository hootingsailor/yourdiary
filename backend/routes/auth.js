const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Create a user End point -> createuser


router.post('/createuser', [
	// Here I used Express validator
	body('name').isLength({ min: 3 }),
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
], async (req, res) => {
	// If error occur retrun bad request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		// Check whether user with the given email already exists 
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({ error: "Sorry a user with this email aready exists!" })
		}
		// Adding security to password using bcryptjs
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(req.body.password, salt)
		// Creating a new user
		user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: secPass,
		})
		// Add Json Web Token
		const JWT_SECRET = 'Aakash123rocks#'
		const data = {
			user: {
				id: user.id
			}
		}
		const authToken = jwt.sign(data, JWT_SECRET);
		res.json({ authToken })

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// Authenticate a user End Point -> login


router.post('/login', [
	// Here I used Express validator
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password can not be blank').exists(),
], async (req, res) => {
	// If error occur retrun bad request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Enter correct email or password" });
		}
		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			return res.status(400).json({ error: "Enter correct email or password" });
		}
		const JWT_SECRET = 'Aakash123rocks#'
		const payload = {
			user: {
				id: user.id
			}
		}
		const authToken = jwt.sign(payload, JWT_SECRET);
		res.json({ authToken })
		
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports = router