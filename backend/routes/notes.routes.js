const { Router } = require('express');

const router = Router();
const { createNewNote, getAllNotes , editNote , deleteNote } = require('../controllers/notes.controllers');//desestructción
const { verifyToken } = require('../middlewares/jwt')

/* Peticiones GET en la raíz / */
router.get("/notes", verifyToken , getAllNotes);

router.post("/notes/add", verifyToken ,createNewNote);

router.put("/notes/edit", verifyToken , editNote);

router.delete("/notes/delete",verifyToken , deleteNote);

module.exports = router;