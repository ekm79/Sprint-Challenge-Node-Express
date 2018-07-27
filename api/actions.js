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

module.exports = router;