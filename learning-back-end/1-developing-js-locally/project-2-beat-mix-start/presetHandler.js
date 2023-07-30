// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (requestType, presetIndex, newPresetArray) => {
    let resultArray = [];
    const validRequestTypes = ['GET', 'PUT'];

    if ((presetIndex < 0) || (presetIndex >= presets.length)) {
        resultArray.push(404);
    } else if (!validRequestTypes.includes(requestType)) {
        resultArray.push(400);
    } else {
        resultArray.push(200);
        if (requestType === 'GET') {
            resultArray.push(presets[presetIndex]);
        } else if (requestType === 'PUT') {
            presets[presetIndex] = newPresetArray;
            resultArray.push(newPresetArray);
        }
    }
    
    return resultArray;
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
