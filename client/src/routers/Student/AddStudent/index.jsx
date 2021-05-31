import React, { useContext, useState } from "react";
import FaceFinder from "../../../apis/FaceFinder";
import { FaceContext } from "../../../context/FaceContext";

const AddStudent = () => {
  const { addStudents } = useContext(FaceContext);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await FaceFinder.post("/students", {
        name,
        room,
      });
      addStudents(response.data.data.student);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Class"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
