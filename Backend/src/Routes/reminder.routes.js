const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/auth.middleware");

const {
sendReminder
}
=
require("../controllers/reminder.controller");


router.use(protect);


router.post(
"/send/:id",
sendReminder
);


router.post(
"/send",
sendReminder
);


module.exports = router;