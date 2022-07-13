
const { createPool } = require('mysql');




//connection  pool
const pool = createPool({

    connectionLimit: 100,
    host: process.env.DB_HOST,

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});



exports.chosepage = (req, res) => {

    res.render('homepage');
}

exports.teacherlogin = (req, res) => {

    res.render('teacherloginpage');
}



//teacher login verify
exports.openpagestudentdetails = (req, res) => {
    //res.render('adduser');

    const { username, password } = req.body;
    // connect to db
    pool.getConnection((err, Connection) => {

        if (err) throw err; //not connected

        console.log("connect as id" + Connection.threadId);


        let searchTerm = req.body.search;

        console.log();

        //user the connection
        Connection.query('select * from teacherlogin', (err, logindata) => {

            console.log('teacherlogin data is \n', logindata);
            //when done the connection release it
            Connection.release();


            if (!err) {

                console.log('goining to collect data from user table');
                // connect to db
                pool.getConnection((err, Connection) => {

                    if (err) throw err; //not connected

                    console.log("connect as id" + Connection.threadId);

                    //user the connection
                    Connection.query('select * from studentscore', (err, rows) => {

                        //when done the connection release it
                        Connection.release();

                        if (!err) {
                            console.log("rendering to home page");

                            let removedUser = req.query.removed;
                            res.render('studentdata', { rows, removedUser });
                        }
                        else {
                            console.log(err);
                        }

                        console.log('the data from user table:\n', rows);



                    });
                });




            }
            else {
                console.log(err);
            }







            // console.log('the data from teacherlogin table:\n', logindata);



        });
    });


}




//teacher login verify
exports.loginverify = (req, res) => {
    //res.render('adduser');

    const { username, password } = req.body;
    // connect to db
    pool.getConnection((err, Connection) => {

        if (err) throw err; //not connected

        console.log("connect as id" + Connection.threadId);


        let searchTerm = req.body.search;

        console.log();

        //user the connection
        Connection.query('select * from teacherlogin', (err, logindata) => {

            console.log('teacherlogin data is \n', logindata);
            //when done the connection release it
            Connection.release();

            for (var i = 0; i < logindata.length; i++) {
                console.log('enter into for loop');
                var data = logindata[i];
                console.log("the data from database is", data);
                if (data.username == username && data.password == password) {

                    console.log('enter into if statcement loop');


                    if (!err) {

                        console.log('goining to collect data from user table');
                        // connect to db
                        pool.getConnection((err, Connection) => {

                            if (err) throw err; //not connected

                            console.log("connect as id" + Connection.threadId);

                            //user the connection
                            Connection.query('select * from studentscore', (err, rows) => {

                                //when done the connection release it
                                Connection.release();

                                if (!err) {
                                    console.log("rendering to home page");

                                    let removedUser = req.query.removed;
                                    res.render('studentdata', { rows, removedUser });
                                }
                                else {
                                    console.log(err);
                                }

                                console.log('the data from user table:\n', rows);



                            });
                        });




                    }
                    else {
                        console.log(err);
                    }

                }

            }

        });
    });


}




exports.studentdataview = (req, res) => {
    res.render('addstudent');

}

exports.createstudent = (req, res) => {
    //res.render('adduser');

    const { roll, name, dob, score } = req.body;
    // connect to db
    pool.getConnection((err, Connection) => {

        if (err) throw err; //not connected

        console.log("connect as id" + Connection.threadId);


        let searchTerm = req.body.search;

        console.log();

        //user the connection
        Connection.query('insert into studentscore set rollno =?,name=?,dob=?,score=?', [roll, name, dob, score], (err, rows) => {

            //when done the connection release it
            Connection.release();

            if (!err) {
                console.log("rendering to home page");

                res.render('addstudent', { alert: 'User Added Successfully' });
            }
            else {
                console.log(err);
            }

            console.log('the data from user table:\n', rows);



        });
    });


}



//edit user

exports.editstudent = (req, res) => {
    //res.render('edit-user');



    // connect to db
    pool.getConnection((err, Connection) => {

        if (err) throw err; //not connected

        console.log("connect as id" + Connection.threadId);

        //user the connection
        Connection.query('select * from studentscore where rollno=? ', [req.params.rollno], (err, rows) => {

            //when done the connection release it
            Connection.release();

            if (!err) {
                console.log("rendering to home page");

                res.render('edit-student', { rows });
            }
            else {
                console.log(err);
            }

            console.log('the data from user table:\n', rows);



        });
    });

}


//update  user

exports.updatestudent = (req, res) => {
    //res.render('edit-user');


    const { name, dob, score } = req.body;


    // connect to db
    pool.getConnection((err, Connection) => {

        if (err) throw err; //not connected

        console.log("connect as id" + Connection.threadId);

        //user the connection
        Connection.query('update studentscore set name=?,dob=?,score=? where rollno=?', [name, dob, score, req.params.rollno], (err, rows) => {

            //when done the connection release it
            Connection.release();

            if (!err) {


                // connect to db
                pool.getConnection((err, Connection) => {

                    if (err) throw err; //not connected

                    console.log("connect as id" + Connection.threadId);

                    //user the connection
                    Connection.query('select* from studentscore where rollno=? ', [req.params.rollno], (err, rows) => {

                        //when done the connection release it
                        Connection.release();

                        if (!err) {
                            console.log("rendering to home page");

                            res.render('edit-student', { rows, alert: `${name} has been updated` });
                        }
                        else {
                            console.log(err);
                        }

                        console.log('the data from user table:\n', rows);



                    });
                });



            }
            else {
                console.log(err);
            }

            console.log('the data from user table:\n', rows);



        });
    });

}

//student view

exports.studentsearchview = (req, res) => {

    res.render('search-result');
}

//search result
exports.resultview = (req, res) => {

    const { roll, name} = req.body;

    // connect to db
    pool.getConnection((err, Connection) => {

        if (err) throw err; //not connected

        console.log("connect as id" + Connection.threadId);
        //user the connection
        Connection.query('select* from studentscore where rollno=? ', [roll], (err, rows) => {

            console.log('the data from studentscore table:\n', rows);

            //when done the connection release it
            Connection.release();

            if (!err) {
                console.log("rendering to home page");

                res.render('check', { rows });
            }
            else {
                console.log(err);
            }

            console.log('the data from studentscore table:\n', rows);



        });
    });


}

//delete studemt

exports.deletestudent = (req, res) => {
    //res.render('edit-user');



    // connect to db
    pool.getConnection((err, Connection) => {

        if (err) throw err; //not connected

        console.log("connect as id" + Connection.threadId);

        //user the connection
        Connection.query('delete from studentscore where rollno=? ', [req.params.rollno], (err, rows) => {

            //when done the connection release it
            Connection.release();

            if (!err) {
                console.log("rendering to home page");

                let removedUser = encodeURIComponent('User successfully removed');
                res.redirect('/studentdatamanage');
                //res.render('home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('the data from user table:\n', rows);



        });
    });

}





