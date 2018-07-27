const express = require('express');
const server = express();
const actionDb = require('./../data/helpers/actionModel.js')
const router = express.Router();

server.use(express.json());


router.get('/', async (req, res) => {
    try {
        const actions = await actionDb.get();
        res.status(200).json(actions)
    } catch(err) {
        res.status(500).json({error: 'The actions information could not be retrieved.'})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const actions = await actionDb.get(id);
        res.status(200).json(actions);
        if (!id) {
            res.status(404).json({error: 'The action with the specified id does not exist.'})
        }
    } catch(err) {
        res.status(500).json({error: 'The action information could not be retrieved.'})
    }
})

router.post('/', async (req, res) => {
    const newAction = req.body;
    try {
        const action = await actionDb.insert(newAction);
        res.status(201).json(action);
        if (!project_id || !description) {
            res.status(400).json({error: 'You must provide a name and description.'});
            return;
        }
        if (newAction.description > 128) {
            res.status(400).json({error: 'Description must be less than 128 characters.'});
            return;
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error saving the action to the database.'})
    }
})

router.put('/:id', async (req, res) => {
    const updated = req.body;
    try {
        const updatedAction = await actionDb.update(updated);
        res.status(200).json({updatedAction});
        if (!project_id || !description) {
            res.status(400).json({error: 'You must provide a name and description.'});
            return;
        }
        if (newAction.description > 128) {
            res.status(400).json({error: 'Description must be less than 128 characters.'});
            return;
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error saving the changes to the database.'})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await actionDb.remove(id);
        res.status(200).json(deleted);
        if(!id) {
            res.status(404).json({error: 'The action with the specified ID does not exist'})
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error deleting the action.'})
    }
})

module.exports = router;