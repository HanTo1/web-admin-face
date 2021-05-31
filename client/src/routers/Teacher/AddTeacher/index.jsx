import React, { useContext, useState } from "react";
import FaceFinder from "../../../apis/FaceFinder";
import { FaceContext } from "../../../context/FaceContext";

const AddTeacher = () => {
  const { addTeachers } = useContext(FaceContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      const response = await FaceFinder.post("/teachers", {
        name,
        email,
        password,
      });
      addTeachers(response.data.data.teacher);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              type="text"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="col">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              type="text"
              placeholder="password"
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

export default AddTeacher;
