const express = require('express');

const router = express.Router();



const service = require('../services/student.service');
//http:localhost 3000


router.get('/', async(req,res)=>{
     const student = await service.getAllStudent();
     res.send(student);
});


router.get('/:id', async(req,res)=>{
    const student = await service.getAllStudentbyID(req.params.id);
    if(student.length == 0)
    res.status(404).json('no record with given id :' +req.params.id);
    else
    res.send(student);
});

router.delete('/:id', async(req,res)=>{
    const student = await service.deleteStudent(req.params.id);
    console.log(student);
    // if(student.length == 0)
    // res.status(404).json('no record with given id :' +req.params.id);
    // else
    res.send('Da xoa thanh cong ');
});



module.exports =router;


