const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  // Ensure this references the correct model (i.e., 'User' model in your database)
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', NotesSchema);  // Use 'Note' consistently
module.exports = Note;
