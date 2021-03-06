const httpStatus = require('../utils/httpStatus');

const productsErrorMiddleware = (error, _req, res, next) => {
  const { message } = error;
  if (message.includes('required')) {
    return res.status(httpStatus.BAD_REQUEST).json({ message });
  }
  if (message.includes('length')) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message });
  }
  if (message.includes('greater than or equal to 1')) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message });
  }
  if (message.includes('Product not found')) {
    return res.status(httpStatus.NOT_FOUND).json({ message });
  }
  next(error);
};

const salesErrorMiddleware = (error, _req, res, _next) => {
  const { message } = error;
  if (message.includes('Sale not found')) {
    return res.status(httpStatus.NOT_FOUND).json({ message });
  }
  return res.status(httpStatus.SERVER_ERROR).json({ message: 'server error' });
};

// const errorMiddleware = (error, _req, res, _next) => {
  // console.log('errmidd', error);
  // const { message } = error;
  // if (message.includes('required')) {
  //   return res.status(httpStatus.BAD_REQUEST).json({ message });
  // }
  // if (message.includes('length')) {
  //   return res.status(httpStatus.UNPROCESSABLE_ENTITY)
  //     .json({ message });
  // }
  // if (message.includes('greater than or equal to 1')) {
  //   return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message });
  // }
  // if ((message.includes('Product not found')) || (message.includes('Sale nof found'))) {
  //   return res.status(httpStatus.NOT_FOUND).json({ message });
  // }
  // return res.status(httpStatus.SERVER_ERROR).json({ message: 'server error' });

//   productsErrorMiddleware(error);
//   salesErrorMiddleware(error);
// };

module.exports = { productsErrorMiddleware, salesErrorMiddleware };