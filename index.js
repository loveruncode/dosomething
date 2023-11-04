const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mysqlPool = require("./db"); // Import module kết nối cơ sở dữ liệu
const cors = require('cors');
const app = express();
const port = 3001;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student",
      description: "API for my website by NhatMy",
      contact: {
        name: "tran nhat my",
        servers: ["http://localhost:3000"],
      },
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());


// Endpoint route for /student
app.get("/student", async (req, res) => {
  try {
    const [rows, fields] = await mysqlPool.query("SELECT * FROM sinhvien");
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});





/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get list of students
 *     description: Retrieve a list of all students.
 *     responses:
 *       200:
 *         description: A list of students
 */









app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
