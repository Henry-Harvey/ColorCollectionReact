import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import style from "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";
import Colors from "./Colors";
import Color from "./Color";
import NewColor from "./NewColor";

export default function App() {
  const [appState, setAppState] = useState({
    colors: [],
  });

  const retrieveColors = useCallback(() => {
    console.log("Retrieving all Colors");
    axios
      .get("http://localhost:3000/colors")
      .then((colorsResponse) => {
        console.log("All Colors response", colorsResponse);
        if (colorsResponse?.data === "") {
          console.log("Colors not found");
          return;
        }
        setAppState((state) => ({
          ...state,
          colors: colorsResponse.data,
        }));
      })
      .catch((error) => {
        console.log("Retrieve Colors error", error);
      });
  }, []);

  useEffect(() => {
    retrieveColors();
  }, [retrieveColors]);

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  <Colors colors={appState.colors} />
                </div>
              );
            }}
          />
          <Route
            exact
            path="/color/:id"
            render={() => {
              return (
                <div>
                  <Color retrieveColors={retrieveColors} />
                </div>
              );
            }}
          />
          <Route
            exact
            path="/add"
            render={() => {
              return (
                <div>
                  <NewColor retrieveColors={retrieveColors} />
                </div>
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}
