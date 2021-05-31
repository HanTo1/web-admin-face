import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./routers/Home";
import { FaceContextProvider } from "./context/FaceContext";
import HomeTeachers from "./routers/Teacher/Main";
import UpdateTeacher from "./routers/Teacher/Update";
import HomeStudents from "./routers/Student/Main";
import UpdateStudent from "./routers/Student/Update";
import Login from "./routers/Login";
import "./index.css";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import { getToken, removeUserSession, setUserSession } from "./utils/Common";
import axios from "axios";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (~token) {
      return;
    }

    axios
      .get(`ttp://localhost:3001/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div>Checking Authentication...</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FaceContextProvider>
          <BrowserRouter>
            <Switch>
              <PublicRoute exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/"
                exact
                component={Home}
                layout={Sidebar}
              />
              {/* TEACHERS */}
              <PrivateRoute
                exact
                path="/teachers"
                component={HomeTeachers}
                layout={Sidebar}
              />
              <RouteWrapper
                exact
                path="/teachers/:id/update"
                component={UpdateTeacher}
              />

              {/* STUDENTS */}
              <PrivateRoute
                exact
                path="/students"
                component={HomeStudents}
                layout={Sidebar}
              />
              <RouteWrapper
                exact
                path="/students/:id/update"
                component={UpdateStudent}
              />
            </Switch>
          </BrowserRouter>
        </FaceContextProvider>
      </Suspense>
    </div>
  );
}

function RouteWrapper({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default App;
