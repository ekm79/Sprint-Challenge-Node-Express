const express = require('express');
const server = express();
const actionDb = require('./../data/helpers/actionModel.js')
const router = express.Router();

server.use(express.json());



module.exports = router;