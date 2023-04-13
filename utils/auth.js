import passport from 'passport';

const authenticateToken = passport.authenticate('jwt', { session: false });

export {
  authenticateToken,
}