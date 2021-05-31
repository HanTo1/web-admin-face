const db = require("../db/index.js");

class Students {
  // get all Students
  getStudents = async (req, res) => {
    try {
      const results = await db.query("select * from students");
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          student: results.rows,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get a Students
  getStudent = async (req, res) => {
    try {
      const results = await db.query(
        "select * from students where ma_sv = $1",
        [req.params.id]
      );
      res.status(200).json({
        status: "success",
        data: {
          student: results.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // create Students
  createStudent = async (req, res) => {
    console.log(req.body);
    try {
      const results = await db.query(
        "insert into students(name, room) values($1, $2) returning *",
        [req.body.name, req.body.room]
      );
      res.status(201).json({
        status: "success",
        data: {
          student: results.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // update student
  updateStudent = async (req, res) => {
    console.log(req.body);
    try {
      const results = await db.query(
        "UPDATE students SET name = $1, room= $2 where ma_sv = $3 returning *",
        [req.body.name, req.body.room, req.params.id]
      );
      console.log(results);

      res.status(200).json({
        status: "success",
        data: {
          student: results.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete student
  deleteStudent = async (req, res) => {
    try {
      const results = db.query("DELETE from students where ma_sv = $1", [
        req.params.id,
      ]);

      res.status(204).json({
        status: "success",
      });
    } catch (error) {}
  };
}

module.exports = new Students();
