const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/',(req,res) => {
    res.render('student/addOrEdit.hbs',{
        viewTitle:'Insert Record'
    });
});

router.post('/',(req,res) => {
    if (req.body._id == '')
    insertRecord(req,res); 
    else
    updateRecord(req,res);
});

function insertRecord(req,res){
    let student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.save((err, doc) => {
        if(!err)
        res.redirect('student/list');
        else {
            if (err.name == 'ValidationError') {
                validationError(err, req.body);
                res.render('student/addOrEdit.hbs',{
                    student: req.body
                });
            }
            else
            console.log('Error during record insertion' +err);
        }
    });
}

function updateRecord(req,res) {
    Student.findOneAndUpdate({_id: req.body._id }, req.body, { new: true }, (err,doc) => {
        if(!err) { res.redirect('student/list'); }
        else {
            if (err.firstName == 'ValidationError') {
                validationError(err,req.body);
                res.render('student/addOrEdit', {
                    viewTitle: 'Update Record',
                    student: req.body
                });
            }
            else
                console.log('Error during record update: ' +err);
        }
    });
}

router.get('/list' , (req,res) => {
    Student.find((err, docs) => {
        if(!err) {
            res.render('student/list.hbs',{
                list: docs
            });
        }
        else {
            console.log('Error in retrieving list :' +err);
        }
    });
});

function validationError(err, body) {
    for(field in err.errors) {
        switch(err.errors[field].path) {
            case 'firstName':
                body['firstNameError'] = err.errors[field].message;
                break;
                case 'lastName' :
                    body['lastNameError'] = err.errors[field].message;
                    break;
                default:
                    break;
        }
    }
}

router.get('/:id',(req,res) => {
    Student.findById(req.params.id, (err,doc) => {
        if(!err) {
            res.render('student/addOrEdit.hbs',{
                viewTitle: 'Update Student',
                student: doc
            });
        }
    });
});

router.get('/delete/:id', (req,res) => {
    Student.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {
            res.redirect('/student/list');
        }
        else { console.log('Error in deletion: ' +err); }
    });
});
module.exports = router;