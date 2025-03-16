const express = require('express');
const cors = require('cors');
const app = express();
const certificateRoute = require('./route/certificateRoute');

app.use(cors());
app.use(express.json());

// api dynamic  
app.use('/api', certificateRoute); 
// static  
app.use('/templates', express.static('templates'))

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server Running');
});
