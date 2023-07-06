const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const ErrorHandler = require('./utils/ErrorHandler');
const Routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

app.use(morgan('dev'));

app.use(helmet());

Routes(app);
app.use(ErrorHandler);

module.exports = app;


