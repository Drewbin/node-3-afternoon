const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv').config();

//Middleware
const checkForSession = require('./middlewares/checkForSession');

//Controllers
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use ( session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true, 
}));
app.use(checkForSession);
app.use(express.static( `${__dirname}/../build` ));

//Endpoints
app.get('/api/swag', swagController.read);

//Auth Endpoints
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

//Cart Endpoints
app.post('/api/cart', cartController.add);
app.post('api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);

//Search Endpoints
app.get('/api/search', searchController.search);

app.listen( port, () => {
    console.log(`Server listening on port ${port}.`);
});