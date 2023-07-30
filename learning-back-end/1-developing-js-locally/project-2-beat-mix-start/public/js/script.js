// Drum Arrays
let kicks = new Array(16).fill(false);
let snares = new Array(16).fill(false);
let hiHats = new Array(16).fill(false);
let rideCymbals = new Array(16).fill(false);

function toggleDrum(drumType, index) {
    // Check if either argument is missing
    if ((drumType === undefined) || (index === undefined)) {
        return;
    }
    // Check that index is valid
    if ((index < 0) || index >= 16) {
        return;
    }
    
    switch (drumType) {
        case 'kicks':
            kicks[index] = !kicks[index];
            break;
        case 'snares':
            snares[index] = !snares[index];
            break;
        case 'hiHats':
            hiHats[index] = !hiHats[index];
            break;
        case 'rideCymbals':
            rideCymbals[index] = !rideCymbals[index];
            break;
        default:
            return;
    }
}

function clear(drumType) {
    switch (drumType) {
        case 'kicks':
            kicks = new Array(16).fill(false);
            break;
        case 'snares':
            snares = new Array(16).fill(false);
            break;
        case 'hiHats':
            hiHats = new Array(16).fill(false);
            break;
        case 'rideCymbals':
            rideCymbals = new Array(16).fill(false);
            break;
        default:
            return;
    }
}

function invert(drumType) {
    // Check that an argument is passed
    if (drumType === undefined) {
        return;
    }

    let invertedArray = [];
    switch (drumType) {
        case 'kicks':
            kicks.forEach(element => {
                invertedArray.push(!element);
            });
            kicks = invertedArray;
            break;
        case 'snares':
            snares.forEach(element => {
                invertedArray.push(!element);
            });
            snares = invertedArray;
            break;
        case 'hiHats':
            hiHats.forEach(element => {
                invertedArray.push(!element);
            });
            hiHats = invertedArray;
            break;
        case 'rideCymbals':
            rideCymbals.forEach(element => {
                invertedArray.push(!element);
            });
            rideCymbals = invertedArray;
            break;
        default:
            return;
    }
}

function getNeighborPads(x, y, size) {
    let neighborPads = [];

    // Check that passed indices are valid
    if ((x < 0) || (y < 0) || (x >= size) || (y >= size)) {
        return [];
    }
        
    // Get neighbouring cells
    let potentialNeighbors = [
        [x, y+1],       // up
        [x, y-1],       // down
        [x-1, y],       // left
        [x+1, y]        // right
    ];

    potentialNeighbors.forEach(neighbor => {
        if ((neighbor[0] >= 0) && (neighbor[0] < size) && (neighbor[1] >= 0) && (neighbor[1] < size)) {
            neighborPads.push(neighbor);
        }
    });

    return neighborPads;
}
