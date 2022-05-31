const { application } = require('express');
const express = require('express');
const routes = express.Router();


//BOOKS
/*const { getBooks, postBooks,deleteBooks,putBooks } = require("../controllers/booksController");
routes.get('/', getBooks);
routes.post('/', postBooks);
routes.delete('/:id',deleteBooks);
routes.put('/:id',putBooks);
*/
//const { getTests } = require("../controllers/testController");
//routes.get('/', getTests);
//User

const {authentication} = require("../controllers/authenticationController");
routes.get('/authentication', authentication);

const {menu} = require("../controllers/menuController");
routes.get('/menu', menu);

module.exports= routes;