const express = require("express");
const router = express.Router();
const db = require("../models");
const { CrudController } = require("../controllers");


tarefa = new CrudController(db.Tarefa);

router.post("/", tarefa.create.bind(tarefa));
router.get("/", tarefa.findAll.bind(tarefa));

module.exports = router;