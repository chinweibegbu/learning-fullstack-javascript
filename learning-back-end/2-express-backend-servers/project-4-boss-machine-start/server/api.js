const express = require('express');
const apiRouter = express.Router();

// Load DB methods
const service = require('./db');

// Add ID checker middleware
const idChecker = (req, res, next, id) => {
    const minions = service.getAllFromDatabase('minions');

    const foundIndex = minions.findIndex((minion) => {
        return minion.id === id;
    });
    if (foundIndex !== -1) {
        req.minionId = id;
        next();
    } else {
        res.status(404).send('Minion not found!');
    }
};
apiRouter.param('minionId', idChecker);

apiRouter.get('/minions', (req, res, next) => {
    const minions = service.getAllFromDatabase('minions');
    res.send(minions);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minion = service.getFromDatabaseById('minions', req.minionId);
    res.send(minion);
});

apiRouter.post('/minions', (req, res, next) => {
    const minionDetails = req.body;

    if ('salary' in minionDetails && Number(minionDetails.salary) < 0) {
        res.status(400).send("Salary cannot be negative");
    }

    try {
        const createdMinion = service.addToDatabase('minions', minionDetails);
        res.status(201).send(createdMinion);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const updatedMinionDetails = req.body;

    if ('salary' in updatedMinionDetails && Number(updatedMinionDetails.salary) < 0) {
        res.status(400).send("Salary cannot be negative");
    }

    try {
        const currentMinion = service.getFromDatabaseById('minions', req.minionId);

        const updatedMinionDetailsWithId = Object.assign(
            {
                "id": req.minionId,
                "salary": currentMinion.salary
            },
            updatedMinionDetails
        );
        const updatedMinion = service.updateInstanceInDatabase('minions', updatedMinionDetailsWithId);

        res.status(200).send(updatedMinion);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const deleteIsSuccessful = service.deleteFromDatabasebyId('minions', req.minionId);

    if (deleteIsSuccessful) {
        res.status(204).send();
    } else {
        res.status(400).send("Delete operation failed");
    }
});

module.exports = apiRouter;
