import createHttpError from 'http-errors';
import { Sessions } from '../db/Models/session.js';
import { User } from '../db/Models/User.js';


export const authenticate = async (req, res, next) => {
    const header = req.get('Authorization');

    if (!header) {
      return next(createHttpError(401, 'Auth header is not provided!'));
    }

    const [bearer, token] = header.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of bearer type'));
    }

    const session = await Sessions.findOne({ accessToken: token });

    if (!session) {
      return next(createHttpError(401, 'Session not found!'));
    }

    if (Date.now() > session.accessTokenValidUntil) {
      return next(createHttpError(401, 'Session token is expired!'));
    }

    const user = await User.findById(session.userId);

    if (!user) {
      return next(
        createHttpError(401, 'User associated with this session in not found!'),
      );
    }

    req.user = user;

    return next();
  };

