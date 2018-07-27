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

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const projects = await projectDb.get(id);
        res.status(200).json(projects);
        if (!id) {
            res.status(404).json({error: 'The project with the specified id does not exist.'})
        }
    } catch(err) {
        res.status(500).json({error: 'The project information could not be retrieved.'})
    }
})


module.exports = router;