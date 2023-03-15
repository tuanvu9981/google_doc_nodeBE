## Google Document Nodejs Backend

### .ENV 
1. ```npm i dotenv```
2. Inside **index.js**
```
require('dotenv').config();

const DB_URI = process.env.URI;
// mongodb+srv://.....
```