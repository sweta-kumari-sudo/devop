const mongoose = require('mongoose');
let notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    writtenBy: {
        type: String,
        required: true
    }
});

mongoose.model('Note',notesSchema);