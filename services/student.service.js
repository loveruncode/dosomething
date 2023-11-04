const db = require('../db');

module.exports.getAllStudent  = async () =>{
    const [record] =  await db.query("select * from student").catch(err =>{
        console.log('fail!!' + err);
       })
      return record;
}

module.exports.getAllStudentbyID  = async (id) =>{
    const [record] =  await db.query("select * from student where id = " + [id] ).catch(err =>{
        console.log('fail!!' + err);
       })
      return record;
}




module.exports.deleteStudent = async(id) =>{
    const [record] = await db.query('delete from student where id = '+ [id]);
    return record;
}

