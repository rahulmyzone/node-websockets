const express = require("express");

const app = express();
const routes = require("./routes");
app.use(express.json());
app.use(routes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});