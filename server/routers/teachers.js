const express = require("express");
const {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers.js");
const router = express.Router();

router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
