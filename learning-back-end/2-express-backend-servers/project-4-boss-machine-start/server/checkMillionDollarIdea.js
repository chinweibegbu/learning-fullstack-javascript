const service = require('./db');

const checkMillionDollarIdea = (req, res, next) => {
    const ideaDetails = req.body;

    if (req.method === 'POST') {
        if ((ideaDetails.numWeeks) && (ideaDetails.weeklyRevenue)) {
            const total_value = Number(ideaDetails.numWeeks) * Number(ideaDetails.weeklyRevenue);
            if (total_value < 1000000) {
                res.status(400).send(`Total idea value must be at least $1000000 >> Currently $${total_value}`);
            }
        }
        next();
    }

    if (req.method === 'PUT') {
        // If the PUT request body does not change any of the value-related properties, pass control to the next function in the middleware stack
        if (!(ideaDetails.numWeeks) && !(ideaDetails.weeklyRevenue)) {
            next();
        } else {
            // If the PUT request body changes any of the value-related properties, get the original details
            const originalIdeaDetails = service.getFromDatabaseById('ideas', req.ideaId);

            // Add the original value-related property value to the details
            const ideaPropertyNames = ['numWeeks', 'weeklyRevenue'];
            ideaPropertyNames.forEach((propertyName) => {
                if (!ideaDetails[propertyName]) {
                    ideaDetails[propertyName] = originalIdeaDetails[propertyName];
                }
            });

            // If the value is less than $1000000, send a 400 BAD METHOD status
            const total_value = ideaDetails.numWeeks * ideaDetails.weeklyRevenue;
            if (total_value < 1000000) {
                res.status(400).send(`Total idea value must be at least $1000000 >> Current value: $${total_value}`);
            }
            next();
        }
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
