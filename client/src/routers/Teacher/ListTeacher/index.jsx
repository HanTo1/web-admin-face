import React, { useContext, useEffect } from "react";
import FaceFinder from "../../../apis/FaceFinder";
import { FaceContext } from "../../../context/FaceContext";
import { useHistory } from "react-router-dom";

const Main = (props) => {
  const { teachers, setTeachers } = useContext(FaceContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FaceFinder.get("/teachers");
        console.log("Teachers: ", response.data.data.teacher);
        setTeachers(response.data.data.teacher);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await FaceFinder.delete(`/teachers/${id}`);
      setTeachers(
        teachers.filter((teacher) => {
          return teacher.ma_gv !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    history.push(`/teachers/${id}/update`);
  };

  return (
    <div className="container list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Teacher</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {teachers &&
            teachers.map((teacher) => {
              return (
                <tr key={teacher.ma_gv}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.password}</td>
                  <td>Reviews</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(teacher.ma_gv)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(teacher.ma_gv)}
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

export default Main;
