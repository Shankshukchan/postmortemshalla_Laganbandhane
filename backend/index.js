const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const router = require('./Router/router');
const DbConnect=require("./Config/dbConfig")
DbConnect()


app.use(cors());
app.use(express.json());
// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
