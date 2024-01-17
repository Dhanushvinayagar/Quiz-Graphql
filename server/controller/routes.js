const express = require("express");
const welcome = require("../utils/welcome");
const { users, signup, login, loggedin } = require("../utils/user");

const router = express.Router()

router.get('', welcome)

router.get('/users', users)
router.post('/signup', signup)
router.get('/login', login)
router.get('/loggedin', loggedin)


module.exports = router