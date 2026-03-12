const express = require('express');
const app = express();
const routes = require('./routes');

const port = process.env.PORT || 3000;

// Use routes
app.use('/', routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
