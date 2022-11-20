const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const NotFoundError = require('./errors/NotFoundError');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { loginUser, createUser } = require('./controllers/users');
const { messageErr } = require('./constants/constants');
const handleErrors = require('./middlewares/handleErrors');
const auth = require('./middlewares/auth');
const { createUserValidation, loginValidation } = require('./middlewares/validation');
const cors = require('./middlewares/cors');

app.use(requestLogger); // подключаем логгер запросов за ним идут все обработчики роутов
app.use(cors);

app.post('/signin', loginValidation, loginUser);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use('*', () => {
  throw new NotFoundError(messageErr.notFound.page);
});

app.use(errorLogger); // нужно подключить после обработчиков роутов и до обработчиков ошибок
app.use(errors());
app.use(handleErrors);

app.listen(PORT);

// ssh aleks123@158.160.36.89
// mesto-avtor-HohlovAleks.nomoredomains.club
