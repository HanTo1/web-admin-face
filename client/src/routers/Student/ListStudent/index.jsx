import React, { useContext, useEffect } from "react";
import FaceFinder from "../../../apis/FaceFinder";
import { FaceContext } from "../../../context/FaceContext";
import { useHistory } from "react-router-dom";

const ListStudent = (props) => {
  const { students, setStudents } = useContext(FaceContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FaceFinder.get("/students");
        console.log("students: ", response.data.data.student);
        setStudents(response.data.data.student);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await FaceFinder.delete(`/students/${id}`);
      setStudents(
        students.filter((student) => {
          return student.ma_sv !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    history.push(`/students/${id}/update`);
  };

  return (
    <div className="container list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">ID</th>
            <th scope="col">Student</th>
            <th scope="col">Class</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => {
              return (
                <tr key={student.ma_sv}>
                  <td>{student.ma_sv}</td>
                  <td>{student.name}</td>
                  <td>{student.room}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(student.ma_sv)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(student.ma_sv)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudent;
