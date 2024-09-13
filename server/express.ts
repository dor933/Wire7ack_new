const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
const fs = require('fs');
const path = require('path');