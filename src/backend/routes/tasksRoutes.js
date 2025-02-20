"use strict";

let express = require("express"),
    router = express.Router(),
    db = require('../db');

// GET 
router.get("/", async (req, res, next) => {
    let conn;
    try {
        const result = await db.pool.query("select * from tasks");
        res.send(result);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});


// Test endpoint
router.get("/test", (req, res) => {
    res.json({ message: "Test endpoint is working!" });
});



// POST 
router.post("/", async (req, res, next) => {
    let task = req.body;
    let conn;
    try {
        const result = await db.pool.query("insert into tasks (description) values (?)", [task.description]);
        res.send(result);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

// PUT 
router.put("/", async (req, res, next) => {
    let task = req.body;
    let conn;
    try {
        const result = await db.pool.query("update tasks set description = ?, completed = ? where id = ?", [task.description, task.completed, task.id]);
        res.send(result);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

// DELETE
router.delete("/", async (req, res, next) => {
    let id = req.query.id;
    let conn;
    try {
        const result = await db.pool.query("delete from tasks where id = ?", [id]);
        res.send(result);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

module.exports = router;