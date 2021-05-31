import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import FaceFinder from "../../../apis/FaceFinder";
import { FaceContext } from "../../../context/FaceContext";

const UpdateStudent = () => {
  const { id } = useParams();
  let history = useHistory();

  const { students } = useContext(FaceContext);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await FaceFinder.get(`/students/${id}`);
      console.log("response: ", response);
      setName(response.data.data.student.name);
      setRoom(response.data.data.student.room);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateStudent = await FaceFinder.put(`students/${id}`, {
      name,
      room,
    });
    history.push("/students");
  };

  return (
    <div className="container">
      <h1 className="text-center">Update Teachers</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Class</label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            id="email"
            className="form-control"
            type="text"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
