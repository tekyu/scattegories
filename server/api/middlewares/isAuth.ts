import passport from './passport';

export default function (req, res, next) {
  return passport.authenticate('local', function (err, user, info) {
    if (err) {
      return;
    }
    if (!user) {
      res.redirect('/signin');
      return;
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      const { username, email } = user;
      console.log('isAuth', username, email);
      return res.status(200).send({ username, email });
    });
  })(req, res, next);
}
