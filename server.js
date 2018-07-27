const express = require('express');
const projectRoutes = require('./api/projects');
const actionRoutes = require('./api/actions')

const server = express();
const router = express.Router();

server.use(express.json());
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);




server.listen(8000, () => console.log('API running.'))