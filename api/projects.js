const express = require('express');
const server = express();
const projectDb = require('./../data/helpers/projectModel.js')
const router = express.Router();



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
            return;
        }
    } catch(err) {
        res.status(500).json({error: 'The project information could not be retrieved.'})
    }
})

router.get('/:id/actions', async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectDb.get(id);
        res.status(200).json(project.actions)
        if (!id) {
            res.status(404).json({error: 'The project with the specified id does not exist.'})
            return;
        }
    } catch(err) {
        res.status(500).json({error: 'The project actions could not be retrieved'})
    }
})

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const newProject = req.body;
    try {
        const project = await projectDb.insert(newProject);
        res.status(201).json(project);
        if (!name || !description) {
            res.status(400).json({error: 'You must provide a name and description.'});
            return;
        }
        if (newProject.name > 128) {
            res.status(400).json({error: 'Name must be less than 128 characters.'});
            return;
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error saving the project to the database.'})
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updated = req.body;
    try {
        const updatedProject = await projectDb.update(id, updated);
        res.status(200).json({updatedProject});
        if (!name || !description) {
            res.status(400).json({error: 'You must provide a name and description.'});
            return;
        }
        if (newProject.name > 128) {
            res.status(400).json({error: 'Name must be less than 128 characters.'});
            return;
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error saving the changes to the database.'})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await projectDb.remove(id);
        res.status(200).json(deleted);
        if(!id) {
            res.status(404).json({error: 'The project with the specified ID does not exist'});
            return;
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error deleting the project.'})
    }
})

module.exports = router;