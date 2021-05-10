const app = require('./app');
const { initDB } = require('./db');
const port = process.env.PORT || 3000;

const run = async () => {
  await initDB();
  app.listen(port, () => console.log(`Server listening on port: ${port}`));
};

run();
