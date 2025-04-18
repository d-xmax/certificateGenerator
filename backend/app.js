const express = require('express');
const cors = require('cors');
const app = express();
const certificateRoute = require('./route/certificateRoute');
const multer = require('multer')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, path.join(__dirname, "uploads/"))
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + "-" + file.originalname)
  },

})
const upload = multer({storage})

// api dynamic  
app.use('/api', certificateRoute); 
// static  
app.use('/templates', express.static('templates'))

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server Running ',PORT);
});
