import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import FaceFinder from "../../../apis/FaceFinder";
import { FaceContext } from "../../../context/FaceContext";

const UpdateTeacher = () => {
  const { id } = useParams();
  let history = useHistory();

  const { teachers } = useContext(FaceContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await FaceFinder.get(`/teachers/${id}`);
      console.log("response: ", response);
      setName(response.data.data.teacher.name);
      setEmail(response.data.data.teacher.email);
      setPassword(response.data.data.teacher.password);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateTeacher = await FaceFinder.put(`teachers/${id}`, {
      name,
      email,
      password,
    });
    history.push("/teachers");
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
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
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

export default UpdateTeacher;
