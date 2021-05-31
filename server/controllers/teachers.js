const db = require("../db/index.js");

class Teachers {
  // get all teachers
  getTeachers = async (req, res) => {
    try {
      const results = await db.query("select * from teachers");
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          teacher: results.rows,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get a teachers
  getTeacher = async (req, res) => {
    try {
      const results = await db.query(
        "select * from teachers where ma_gv = $1",
        [req.params.id]
      );
      res.status(200).json({
        status: "success",
        data: {
          teacher: results.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // create teacher
  createTeacher = async (req, res) => {
    console.log(req.body);
    try {
      const results = await db.query(
        "insert into teachers(name, email, password) values($1, $2, $3) returning *",
        [req.body.name, req.body.email, req.body.password]
      );
      res.status(201).json({
        status: "success",
        data: {
          teacher: results.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // update teacher
  updateTeacher = async (req, res) => {
    try {
      const results = await db.query(
        "UPDATE teachers SET name = $1, email= $2, password = $3 where ma_gv = $4 returning *",
        [req.body.name, req.body.email, req.body.password, req.params.id]
      );
      console.log(results);

      res.status(200).json({
        status: "success",
        data: {
          teacher: results.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete teacher
  deleteTeacher = async (req, res) => {
    try {
      const results = db.query("DELETE from teachers where ma_gv = $1", [
        req.params.id,
      ]);

      res.status(204).json({
        status: "success",
      });
    } catch (error) {}
  };
}

module.exports = new Teachers();
