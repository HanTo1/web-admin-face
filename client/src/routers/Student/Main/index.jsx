import React from "react";
import AddStudent from "../AddStudent";
import Header from "../Header";
import ListStudent from "../ListStudent";
import "./style.css";

const HomeStudents = () => {
  return (
    <div className="container">
      <Header />
      <AddStudent />
      <ListStudent />
    </div>
  );
};

export default HomeStudents;
