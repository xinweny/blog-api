import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

const configPassport = app => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
  
        if (!user) return done(null, false, { message: 'Username does not exist.' });
  
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) return done(null, user);
  
          return done(null, false, { message: 'Incorrect password. Please try again.' });
        });
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  passport.use(new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  app.use(passport.initialize());
};

export default configPassport;