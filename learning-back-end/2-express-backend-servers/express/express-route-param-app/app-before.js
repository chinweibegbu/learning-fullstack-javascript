const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const vendingMachine = [
    {
        id: 1,
        name: 'Gum',
        price: 1.25,
    },
    {
        id: 7,
        name: 'Bag of chips',
        price: 3.50,
    },
    {
        id: 23,
        name: 'cumin',
        price: .75,
    }
];

let nextSnackId = 24;

app.use(bodyParser.json());

// Add your code here:



app.get('/snacks/', (req, res, next) => {
    res.send(vendingMachine);
});

app.post('/snacks/', (req, res, next) => {
    const newSnack = req.body;
    if (!newSnack.name || !newSnack.price) {
        res.status(400).send('Snack not found!');
    } else {
        newSnack.id = nextSnackId++;
        vendingMachine.push(newSnack);
        res.send(newSnack);
    }
});

app.get('/snacks/:snackId', (req, res, next) => {
    const snackId = Number(req.params.id);
    const snackIndex = vendingMachine.findIndex(snack => snack.id === snackId);
    if (snackIndex === -1) {
        res.status(404).send('Snack not found!');
    } else {
        res.send(vendingMachine[snackIndex]);
    }
});

app.put('/snacks/:snackId', (req, res, next) => {
    const snackId = Number(req.params.id);
    const snackIndex = vendingMachine.findIndex(snack => snack.id === snackId);
    if (snackIndex !== -1) {
        vendingMachine[snackIndex] = req.body;
        res.send(vendingMachine[snackIndex]);
    } else {
        res.status(404).send('Snack not found!');
    }
});

app.delete('/snacks/:snackId', (req, res, next) => {
    const snackId = Number(req.params.id);
    const snackIndex = vendingMachine.findIndex(snack => snack.id === snackId);
    if (snackIndex === -1) {
        res.status(404).send('Snack not found!');
    } else {
        vendingMachine.splice(snackIndex, 1);
        res.status(204).send();
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});