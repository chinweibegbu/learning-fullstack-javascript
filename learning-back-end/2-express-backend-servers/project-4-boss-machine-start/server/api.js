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

const IdeaIdChecker = (req, res, next, id) => {
    const ideas = service.getAllFromDatabase('ideas');

    const foundIndex = ideas.findIndex((idea) => {
        return idea.id === id;
    });
    if (foundIndex !== -1) {
        req.ideaId = id;
        next();
    } else {
        res.status(404).send('Idea not found!');
    }
};
apiRouter.param('ideaId', IdeaIdChecker);

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

// IDEA ENDPOINTS
apiRouter.get('/ideas', (req, res, next) => {
    const ideas = service.getAllFromDatabase('ideas');
    res.send(ideas);
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const idea = service.getFromDatabaseById('ideas', req.ideaId);
    res.send(idea);
});

apiRouter.post('/ideas', (req, res, next) => {
    const ideaDetails = req.body;

    if ('numWeeks' in ideaDetails && Number(ideaDetails.numWeeks) < 0) {
        res.status(400).send("numWeeks cannot be negative");
    }
    if ('weeklyRevenue' in ideaDetails && Number(ideaDetails.weeklyRevenue) < 0) {
        res.status(400).send("weeklyRevenue cannot be negative");
    }

    try {
        const createdIdea = service.addToDatabase('ideas', ideaDetails);
        res.status(201).send(createdIdea);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    let updatedIdeaDetails = req.body;

    if ('numWeeks' in updatedIdeaDetails && Number(updatedIdeaDetails.numWeeks) < 0) {
        res.status(400).send("numWeeks cannot be negative");
    }
    if ('weeklyRevenue' in updatedIdeaDetails && Number(updatedIdeaDetails.weeklyRevenue) < 0) {
        res.status(400).send("weeklyRevenue cannot be negative");
    }

    try {
        // Add ID to details
        updatedIdeaDetails["id"] = req.ideaId;

        // Ensure all properties are complete before using the DB method
        const originalIdeaDetails = service.getFromDatabaseById('ideas', req.ideaId);
        const ideaPropertyNames = ["name", "description", "numWeeks", "weeklyRevenue"];
        ideaPropertyNames.forEach((propertyName) => {
            if (!updatedIdeaDetails[propertyName]) {
                updatedIdeaDetails[propertyName] = originalIdeaDetails[propertyName];
            }
        });

        // Update idea
        const updatedIdea = service.updateInstanceInDatabase('ideas', updatedIdeaDetails);

        // Send updated idea with a 200 OK status
        res.send(updatedIdea);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const deleteIsSuccessful = service.deleteFromDatabasebyId('ideas', req.ideaId);

    if (deleteIsSuccessful) {
        res.status(204).send();
    } else {
        res.status(400).send("Delete operation failed");
    }
});

module.exports = apiRouter;
