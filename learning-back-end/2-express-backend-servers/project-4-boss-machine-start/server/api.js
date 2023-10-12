const express = require('express');
const apiRouter = express.Router();

// Load DB methods
const service = require('./db');

// Add ID checker middleware
const minionIdChecker = (req, res, next, id) => {
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
apiRouter.param('minionId', minionIdChecker);

// MINION ENDPOINTS
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
    let updatedMinionDetails = req.body;

    if ('salary' in updatedMinionDetails && Number(updatedMinionDetails.salary) < 0) {
        res.status(400).send("Salary cannot be negative");
    }

    try {
        // Add ID to details
        updatedMinionDetails["id"] = req.minionId;
        
        // If the body does not includes salary, add the original minion's salary
        const originalMinionDetails = service.getFromDatabaseById('minions', req.minionId);
        if (!updatedMinionDetails.salary) {
            updatedMinionDetails["salary"] = originalMinionDetails.salary;
        }
        
        // Update minion
        const updatedMinion = service.updateInstanceInDatabase('minions', updatedMinionDetails);

        // Send updated minion with a 200 OK status
        res.send(updatedMinion);
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
