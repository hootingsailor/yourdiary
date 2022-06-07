const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Aakash123rocks#';

// ROUTE-1 Create a user End point -> createuser ("/api/auth/createuser")[No login required]


router.post('/createuser', [
	// Here I used Express validator
	body('name').isLength({ min: 3 }),
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
], async (req, res) => {
	let success = false;
	// If error occur retrun bad request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({success, errors: errors.array() });
	}
	try {
		// Check whether user with the given email already exists 
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({success, error: "Sorry a user with this email aready exists!" });
		}
		// Adding security to password using bcryptjs
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(req.body.password, salt);
		// Creating a new user
		user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: secPass,
		});
		// Add Json Web Token
		const data = {
			user: {
				id: user.id
			}
		};
		success=true;
		const authtoken = jwt.sign(data, JWT_SECRET);
		res.json({success, authtoken });

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE-2 Authenticate a user End Point -> login ("/api/auth/login")[No login required]


router.post('/login', [
	// Here I used Express validator
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password can not be blank').exists(),
], async (req, res) => {
	let success = false;
	// If error occur retrun bad request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	try {
		// Finding user
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({success, error: "Enter correct email or password" });
		}
		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			return res.status(400).json({success, error: "Enter correct email or password" });
		}
		// JSON web token
		const payload = {
			user: {
				id: user.id
			}
		};
		const authtoken = jwt.sign(payload, JWT_SECRET);
		success = true;
		res.json({ success, authtoken });

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE-3 Get logged in user details ("/api/auth/getuser")[Login required]


router.post('/getuser', fetchuser, async (req, res) => {
	// fetchuser is a middleware for getting data from jwt token
	try {
		// get userId using middleware 
		userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports = router