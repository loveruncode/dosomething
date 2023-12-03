const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mysqlPool = require("./db"); // Import module kết nối cơ sở dữ liệu
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());



// Endpoint route for /student
app.get("/student", async (req, res) => {
  try {
    const [rows, fields] = await mysqlPool.query("SELECT * FROM sinhvien");
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



app.get("/question/")
 /// them cau hoi 


 /// them sinh vien 
app.post("/studentAdd", async(req,res)=>{
    try{
       const {id,name,email,masv} = req.body;
        const query = `insert into sinhvien values(?,?,?,?)`;
      await mysqlPool.query(query,[
        id,
        name,
        email,
        masv
      ])

    }catch(error){
      res.status(500).send(error.message)
    }
});
/// xoa sinh vien 
app.delete("/studentDelete", async(req,res)=>{
  try{
    const {id} = req.body;
    const query = `delete from sinhvien where id = ?`;
    await mysqlPool.query(query, [id]);
  }catch(error){
       res.status(500).send(error.message);
  }
})
/// sua sinh vien 

app.put("/studentUpdate", async(req,res)=>{
  try{
    const {id, name,email,masv} = req.body;

    const query = `update sinhvien set name = ?,email = ? ,masv= ? where id = ? ; `;
    await mysqlPool.query(query, [name,email,masv,id]);
      res.status(200).send(`Student updated succesfuly`);

  }catch(error) {
    res.status(500).send(error.message);
  }
})
///// them cau hoi 
app.post("/question13/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { question, answer1, answer2, answer3, answer4 } = req.body;

    await mysqlPool.query(
      "INSERT INTO Cauhoi (id, question, answer1, answer2, answer3, answer4) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE question=VALUES(question), answer1=VALUES(answer1), answer2=VALUES(answer2), answer3=VALUES(answer3), answer4=VALUES(answer4)",
      [id, question, answer1, answer2, answer3, answer4]
    );

    res.status(200).send("Chèn câu hỏi thành công");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// xem cau hoi 
app.get("/question/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [rows, fields] = await mysqlPool.query("SELECT * FROM Cauhoi WHERE id = ?", [id]);

    if (rows.length === 0) {
      res.status(404).send("Question not found");   
      return;
    }

    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// xoa cau hoi 

app.delete('/questionDelete', async(req,res)=>{
    try{
      const {id} =  req.body;
      const query =  `delete from Cauhoi where id = ?`;
      await mysqlPool.query(query, [id]);

    }catch(error){
      res.status(500).send(error.message);
    }
})




const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student",
      description: "API for my website by NhatMy",
      contact: {
        name: "tran nhat my",
        servers: ["http://localhost:3001"],
      },
    },
  },
  apis: ["index.js"], // Update this with the correct file or pattern
  paths: {
    "/student": {
      get: {
        description: "Get all students",
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/studentAdd": {
      post: {
        description: "Add a new student",
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/studentDelete": {
      delete: {
        description: "Delete a student",
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/studentUpdate": {
      put: {
        description: "Update a student",
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/question13/{id}": {
      post: {
        description: "Add or update a question",
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/question/{id}": {
      get: {
        description: "Get a question by ID",
        responses: {
          200: {
            description: "Success",
          },
          404: {
            description: "Question not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/questionDelete": {
      delete: {
        description: "Delete a question",
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());



// app.put("/student/:id", async (req, res) => {
//   console.log(req.params.id);
//   const updateData = req.body;
//   let queryString = "";
//   Object.entries(updateData).map(([key, data]) => {
//     queryString = `${queryString ? `${queryString},` : ""} ${key} = '${data}'`;
//   });
//   try {
//     const query = `UPDATE sinhvien
//     SET ${queryString}
//     WHERE id = ${req.params.id}`;
//     const update = await mysqlPool.query(query);
//     res.json(`updated ${update}`);
//   } catch (e) {
//     res.json(e);
//   }
// });

// app.delete("/student/:id", async (req, res) => {
//   console.log(req.params.id);
//   try {
//     const query = `DELETE FROM sinhvien
//     WHERE id IN (${req.params.id});`;
//     mysqlPool.query(query);
//     res.json("delete success");
//   } catch (e) {
//     res.json(e);
//   }
// });



app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
