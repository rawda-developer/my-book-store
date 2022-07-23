import passport from 'passport';
import mongoose from 'mongoose';
import LocalStrategy from 'passport-local';
import User from '../models/User';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              errors: {
                email: 'Invalid email or password',
              },
            });
          }
        })
        .catch((err) => done(err));
    }
  )
);
