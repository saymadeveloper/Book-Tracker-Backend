const controllers = require("../controllers");
const router = require("express").Router();

router.post("/sign-up", controllers.user.post.signup);
router.post("/sign-in", controllers.user.post.signin);

module.exports = router;