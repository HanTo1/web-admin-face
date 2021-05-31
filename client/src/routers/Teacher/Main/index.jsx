import React from "react";
import AddTeacher from "../AddTeacher";
import Header from "../Header";
import ListTeacher from "../ListTeacher";
import "./style.css";

const HomeTeachers = () => {
  return (
    <div className="container">
      <Header />
      <AddTeacher />
      <ListTeacher />
    </div>
  );
};

export default HomeTeachers;
