const express=require('express');

const router=express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.chosepage);
router.get('/teacherlogin', userController.teacherlogin);
router.get('/studentdatamanage', userController.openpagestudentdetails);


router.post('/studentdatamanage', userController.loginverify);

router.get('/adddata', userController.studentdataview);
router.post('/adddata', userController.createstudent);

router.get('/editstudent/:rollno', userController.editstudent);
router.post('/editstudent/:rollno', userController.updatestudent);

router.get('/searchdata', userController.studentsearchview);

router.post('/studentresult', userController.resultview);

router.get('/:rollno', userController.deletestudent);




module.exports=router;