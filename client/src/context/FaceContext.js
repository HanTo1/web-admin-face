import React, { createContext, useState } from "react";

export const FaceContext = createContext();

export const FaceContextProvider = (props) => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const addTeachers = (teacher) => {
    setTeachers([...teachers, teacher]);
  };
  const addStudents = (student) => {
    setStudents([...students, student]);
  };
  return (
    <FaceContext.Provider
      value={{
        students,
        setStudents,
        addStudents,
        teachers,
        setTeachers,
        addTeachers,
      }}
    >
      {props.children}
    </FaceContext.Provider>
  );
};
