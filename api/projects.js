const express = require('express');
const server = express();
const projectDb = require('./../data/helpers/projectModel.js')
const router = express.Router();

server.use(express.json());

router.get('/', async (req, res) => {
    try {
        const projects = await projectDb.get();
        res.status(200).json(projects)
    } catch(err) {
        res.status(500).json({error: 'The projects information could not be retrieved.'})
    }
})



module.exports = router;