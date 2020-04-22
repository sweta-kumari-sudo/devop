const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Note = mongoose.model('Note');

router.get('/',(req,res) => {
    Note.find((err,docs) => {
        if(!err) {
            res.render('note/list.hbs')
        }
        else {
            console.log("error in retrieving list: " +err);
        }
    });
});

router.get('/',(req,res) => {
    res.render('note/addOrEdit.hbs' , {
        viewTitle: 'Add'
    })
})

router.post('/',(req,res) => {
    if (req.body._id == '')
    insertRecord(req,res);
    else
    updateRecord(req,res);
});

function insertRecord(req,res) {
    let note = new Note();
    note.title = req.body.title;
    note.body = req.body.body;
    note.writtenBy = req.body.writtenBy;
    note.save((err,doc) => {
        if(!err)
        res.redirect('note/addOrEdit');
        else {
            if (err.name == 'ValidationError') {
                validationError(err, req.body);
                res.render('note/addOrEdit.hbs');
            }
        else{
            console.log('Error during record insertion');
        }
    }
    });
}

function updateRecord(req,res) {
    Note.findOneAndUpdate({_id: req.body._id }, req.body, { new:true}, (err,doc) => {
        if(!err) { res.redirect('note/list'); }
        else {
            if (err.name == 'ValidationError') {
                validationError(err,req.body);
                res.render('note/addOrEdit');
            }
            else
            console.log('Error during data update: '+err);
        }
    });
}

router.get('/todo/edit/:id' , (req,res) => {
    Note.findById(req.params.id, (err,doc) => {
        if(!err) {
            res.render('note/addOrEdit.hbs', {
                viewTitle: 'Edit',
                note: doc
            });
        }
    });
});

router.get('/delete/:id',(req,res) => {
    Note.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {
            res.redirect('/note/list');

        }
        else{
            console.log('Error in deletion: '+err);
        }
    });
});

function validationError(err,body) {
    for(fields in err.errors) {
        switch(err.errors[field].path) {
            case 'title':
                body['title'] = err.errors[field].message;
                break;
                case 'body' :
                    body['body'] = err.errors[field].message;
                    break;
                    case 'writtenBy':
                        body['writtenBy'] = err.errors[field].message;
                        break;
                        default:
                            break;
        }
    }
}
module.exports = router;


