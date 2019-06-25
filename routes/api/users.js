const express = require('express')
const router = express.Router()

// @route GET api/users
// @access Public
router.get('/',  (req, res) => {
    res.json({
        msg: "Users Page"
    });
});

module.exports = router;