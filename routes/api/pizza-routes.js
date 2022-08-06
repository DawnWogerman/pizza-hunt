const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

//Set up Get and Post at api/pizzas

router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

//Set up Get ONE, PUT, Delete at /api/pizzas/:id

router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);





    module.exports = router;