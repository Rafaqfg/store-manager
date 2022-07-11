const httpStatus = require('../utils/httpStatus');

const errorMiddleware = (error, _req, res, _next) => {
  const { message } = error;
  if (message.includes('required')) return res.status(httpStatus.BAD_REQUEST).json({ message: '"name" is required' });
  if (message.includes('length')) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: '"name" length must be at least 5 characters long' });
  return res.status(httpStatus.SERVER_ERROR).json({ message: 'server error' });
};

module.exports = errorMiddleware;