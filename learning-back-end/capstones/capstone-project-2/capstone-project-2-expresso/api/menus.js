const express = require('express');
const menusRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const menuItemsRouter = require('./menu-items');

menusRouter.param('menuId', (req, res, next, id) => {
    const menuId = Number(id);
    db.get(
        'SELECT * FROM Menu WHERE id=$id',
        { $id: menuId },
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                req.menuId = menuId;
                next();
            } else {
                res.status(404).send('Menu not found');
            }
        }
    );
});

// Mount menuItemsRouter
menusRouter.use('/:menuId/menu-items', menuItemsRouter);

menusRouter.get('/', (req, res, next) => {
    db.all(
        'SELECT * FROM Menu',
        (error, rows) => {
            if (error) {
                next(error);
            }
            res.status(200).json({ menus: rows });
        }
    );
});

menusRouter.get('/:menuId', (req, res, next) => {
    db.get(
        'SELECT * FROM Menu WHERE id=$id',
        { $id: req.menuId },
        (error, row) => {
            if (error) {
                next(error);
            }
            res.status(200).json({ menu: row });
        }
    );
});

menusRouter.post('/', (req, res, next) => {
    const menu = req.body.menu;
    if (menu.title) {
        db.run(
            'INSERT INTO Menu (title) VALUES ($title)',
            {
                $title: menu.title
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Menu WHERE id=${this.lastID}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(201).send({ menu: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Menu missing required field: title");
    }
});

menusRouter.put('/:menuId', (req, res, next) => {
    const menu = req.body.menu;
    const menuId = req.menuId;

    if (menu.title) {
        db.run(
            'UPDATE Menu SET title=$title WHERE id=$menuId',
            {
                $title: menu.title,
                $menuId: menuId
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Menu WHERE id=${menuId}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(200).send({ menu: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Menu missing one or more required fields: name, position, wage");
    }
});

menusRouter.delete('/:menuId', (req, res, next) => {
    const menuId = req.menuId;

    // Check that Menu does not have related MenuItems
    db.get(
        `SELECT * FROM MenuItem WHERE menu_id=${menuId}`,
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                res.status(400).send('Menu has one or more related menu items');
            } else {
                // Delete menu
                db.run(
                    `DELETE FROM Menu WHERE id=${menuId}`,
                    function (error) {
                        if (error) {
                            next(error);
                        } else {
                            res.status(204).send('Menu successfully deleted');
                        }
                    }
                );
            }
        });
});

module.exports = menusRouter;