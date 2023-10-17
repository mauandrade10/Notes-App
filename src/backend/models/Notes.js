const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Register',
        required:true
    }
}, { timestamps: true })

module.exports = model('Note', NoteSchema);