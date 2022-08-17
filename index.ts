export {};
require('dotenv').config()
// import controllers from './controllers';
const controllers = require('./controllers')

const express = require('express');
import { Request, Response } from 'express';
const passport = require('passport');
require('./db/passportConfig.ts')(passport);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.post(
  "/auth/signup",
  passport.authenticate("local-signup", { session: false }),
  (req: any, res: any) => {
    res.json({ user: req.user });
  }
);
app.post(
  "/auth/login",
  passport.authenticate("local-login", { session: false }),
  (req: any, res: any) => {
    res.json({ user: req.user });
  }
);

app.get(
  '/notes/:user_email/:poi_id', controllers.getNote
)


app.put('/updateNote', controllers.updateNote)


app.post(
  '/postCities', controllers.postCities
)


app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))