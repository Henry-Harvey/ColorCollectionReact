import React, { useState } from "react";
import axios from "axios";
import history from "./History";

// Component for displaying a form that can be submitted to create a new color in the database
export default function NewColor({ retrieveColors }) {
  const [newColorState, setNewColorState] = useState({
    color: {
      id: -1,
      name: "",
      hex: "",
      timestamp: "",
    },
  });

  const handleChangeColor = (prop) => (event) => {
    setNewColorState((state) => ({
      ...state,
      color: {
        ...state?.color,
        [prop]: event.target.value,
      },
    }));
  };

  const addColor = () => {
    console.log("Create Color", newColorState.color);
    axios
      .post(
        "https://color-collection-express.herokuapp.com/colors",
        newColorState.color
      )
      .then((colorResponse) => {
        console.log("Color response", colorResponse);
        if (colorResponse?.data === "") {
          console.log("Color not created");
          return;
        }
        retrieveColors();
        history.push("/");
      })
      .catch((error) => {
        console.log("Create Color error", error);
      });
  };

  const closeForm = () => {
    history.push("/");
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>New Color</h2>
      </div>
      <form
        onSubmit={addColor}
        className="form-group"
        style={{ textAlign: "center", marginLeft: 50, marginRight: 50 }}
      >
        <label for="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
          value={newColorState.color.name}
          name="name"
          onChange={handleChangeColor("name")}
        />
        <label for="hex">Hex</label>
        <input
          type="text"
          className="form-control"
          id="hex"
          required
          value={newColorState.color.hex}
          name="hex"
          onChange={handleChangeColor("hex")}
          style={{ backgroundColor: newColorState.color.hex }}
        />
        <button type="button" className="btn btn-default" onClick={addColor}>
          Create
        </button>
        <button type="button" className="btn btn-default" onClick={closeForm}>
          Close
        </button>
      </form>
    </div>
  );
}
