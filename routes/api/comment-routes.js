const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// api/comments/pizza id - ADD
router.route('/:pizzaId').post(addComment);

// api/comments/pizza id/comment id - DELETE
router.route('/:pizzaId/:commentId').delete(removeComment);











module.exports = router;