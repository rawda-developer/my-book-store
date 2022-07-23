import { expressjwt as jwt } from 'express-jwt';
import { secret } from '../config/secret';
const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'token'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
const auth = {
  required: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};
export default auth;
