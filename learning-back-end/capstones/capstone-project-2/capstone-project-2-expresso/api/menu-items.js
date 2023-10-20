const express = require('express');
const menuItemsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

menuItemsRouter.param('menuItemId', (req, res, next, id) => {
    const menuItemId = Number(id);
    db.get(
        'SELECT * FROM MenuItem WHERE id=$id',
        { $id: menuItemId },
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                req.menuItemId = menuItemId;
                next();
            } else {
                res.status(404).send("MenuItem not found");
            }
        }
    );
});

menuItemsRouter.get('/', (req, res, next) => {
    console.log(req.params.menuId);
    db.all(
        'SELECT * FROM MenuItem WHERE menu_id=$menuId',
        { $menuId: req.params.menuId },
        (error, rows) => {
            if (error) {
                next(error);
            } else {
                res.status(200).json({ menuItems: rows });
            }
        }
    );
});

menuItemsRouter.post('/', (req, res, next) => {
    const menuItem = req.body.menuItem;
    const menuId = req.params.menuId;

    if (menuItem.name && menuItem.inventory && menuItem.price) {
        let insertSql = 'INSERT INTO MenuItem (name, inventory, price, menu_id) VALUES ($name, $inventory, $price, $menuId)';
        let insertValues = {
            $name: menuItem.name,
            $inventory: menuItem.inventory,
            $price: menuItem.price,
            $menuId: menuId
        }
        // If a description is provided, modify the SQL query and insertion values
        if (menuItem.description) {
            insertSql = 'INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES ($name, $description, $inventory, $price, $menuId)';
            insertValues = {
                $name: menuItem.name,
                $description: menuItem.description,
                $inventory: menuItem.inventory,
                $price: menuItem.price,
                $menuId: menuId
            }
        }
        
        db.run(
            insertSql,
            insertValues,
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM MenuItem WHERE id=${this.lastID}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(201).send({ menuItem: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("MenuItem missing one or more required fields: name, inventory, price");
    }
});

menuItemsRouter.put('/:menuItemId', (req, res, next) => {
    const menuItem = req.body.menuItem;
    const menuItemId = req.menuItemId;

    if (menuItem.name && menuItem.inventory && menuItem.price) {
        let updateSql = 'Update MenuItem SET name=$name, inventory=$inventory, price=$price WHERE id=$menuItemId';
        let updateValues = {
            $name: menuItem.name,
            $inventory: menuItem.inventory,
            $price: menuItem.price,
            $menuItemId: menuItemId
        }
        // If a description is provided, modify the SQL query and insertion values
        if (menuItem.description) {
            updateSql = 'Update MenuItem SET name=$name, description=$description, inventory=$inventory, price=$price WHERE id=$menuItemId';
            updateValues = {
                $name: menuItem.name,
                $description: menuItem.description,
                $inventory: menuItem.inventory,
                $price: menuItem.price,
                $menuItemId: menuItemId
            }
        }
        db.run(
            updateSql,
            updateValues,
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM MenuItem WHERE id=${menuItemId}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(200).send({ menuItem: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("MenuItem missing one or more required fields: name, inventory, price");
    }
});

menuItemsRouter.delete('/:menuItemId', (req, res, next) => {
    const menuItemId = req.menuItemId;
    db.run(
        `DELETE FROM MenuItem WHERE id=${menuItemId}`,
        function (error) {
            if (error) {
                next(error);
            }
            res.status(204).send('MenuItem successfully deleted');
        }
    );
});

module.exports = menuItemsRouter;
