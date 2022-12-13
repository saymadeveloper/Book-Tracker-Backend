const controllers = require("../controllers")
const router = require("express").Router();
const utils = require("../utils/utils");

router.post("/add-book", utils.authenticateToken, controllers.book.post.addBookItem);
router.get("/get-all-books", utils.authenticateToken, controllers.book.get.getBooksItem);
router.get("/get-favorite-books", utils.authenticateToken, controllers.book.get.getfavoriteBooksItem);
router.put("/is-favorite", utils.authenticateToken, controllers.book.put.isFavorite);
router.put("/deleted-book", utils.authenticateToken, controllers.book.delete.deletedBook);

module.exports = router;