const app = require('./app');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use(errorMiddleware);