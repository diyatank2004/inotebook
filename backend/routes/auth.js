const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Make sure to import jsonwebtoken
var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET = "diyaisagoodg$irl";

// ROUTE1 :  Route to create a new user using: POST "/api/auth/createuser". No authentication required
router.post(
    "/createuser",
    [
        // Validation checks for user input
        body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password } = req.body;

            // Generate salt and hash the password using bcryptjs
            const salt = await bcrypt.genSalt(10); // 10 salt rounds
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user with the hashed password
            let user = new User({
                name,
                email,
                password: hashedPassword, // Save the hashed password
            });

            // Save the user to the database
            await user.save();

            // Create and send the JWT token
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);

            // Send the token as a response
            res.status(201).json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 2 : Route to authenticate a new user using: POST "/api/auth/login". No authentication required
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").exists().withMessage("Password cannot be blank"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find user by email
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            // Compare the entered password with the stored hash
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            // If password is correct, create and send JWT
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE3 :  Route to get loggedin user details using: POST "/api/auth/getuser". login required
router.post("/getuser",fetchuser,async (req, res) => {
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
module.exports = router;
