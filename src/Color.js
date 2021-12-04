import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import history from "./History";
import { useParams } from "react-router-dom";

export default function Color({ retrieveColors }) {
  let id = useParams().id;

  const [colorState, setColorState] = useState({
    color: {
      id: -1,
      name: "",
      hex: "",
      timestamp: "",
    },
  });

  const retrieveColor = useCallback(() => {
    console.log("Retrieve Color", id);
    axios
      .get("https://color-collection-express.herokuapp.com/colors/" + id)
      .then((colorResponse) => {
        console.log("Color response", colorResponse);
        if (colorResponse?.data === "") {
          console.log("Color not found");
          return;
        }
        setColorState((state) => ({
          ...state,
          color: colorResponse.data,
        }));
      })
      .catch((error) => {
        console.log("Retrieve Color error", error);
      });
  }, [id]);

  useEffect(() => {
    retrieveColor();
  }, [retrieveColor]);

  const handleChangeColor = (prop) => (event) => {
    setColorState((state) => ({
      ...state,
      color: {
        ...state?.color,
        [prop]: event.target.value,
      },
    }));
  };

  const editColor = () => {
    console.log("Edit Color", colorState.color);
    axios
      .patch(
        "https://color-collection-express.herokuapp.com/colors",
        colorState.color
      )
      .then((colorResponse) => {
        console.log("Color response", colorResponse);
        if (colorResponse?.data === "") {
          console.log("Color not updated");
          return;
        }
        retrieveColors();
        history.push("/");
      })
      .catch((error) => {
        console.log("Edit Color error", error);
      });
  };

  const deleteColor = () => {
    console.log("Delete Color", colorState.color);
    axios
      .delete(
        "https://color-collection-express.herokuapp.com/colors/" +
          colorState.color.id
      )
      .then((colorResponse) => {
        console.log("Color response", colorResponse);
        if (colorResponse?.data === "") {
          console.log("Color not deleted");
          return;
        }
        retrieveColors();
        history.push("/");
      })
      .catch((error) => {
        console.log("Delete Color error", error);
      });
  };

  const closeForm = () => {
    history.push("/");
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>Selected Color</h2>
      </div>

      <form
        onSubmit={editColor}
        className="form-group"
        style={{ textAlign: "center", marginLeft: 50, marginRight: 50 }}
      >
        <label for="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
          value={colorState.color.name}
          name="name"
          onChange={handleChangeColor("name")}
        />
        <label for="hex">Hex</label>
        <input
          type="text"
          className="form-control"
          id="hex"
          required
          value={colorState.color.hex}
          name="hex"
          onChange={handleChangeColor("hex")}
          style={{ backgroundColor: colorState.color.hex }}
        />
        <button type="button" className="btn btn-default" onClick={editColor}>
          Edit
        </button>
        <button type="button" className="btn btn-success" onClick={deleteColor}>
          Delete
        </button>
        <button type="button" className="btn btn-default" onClick={closeForm}>
          Close
        </button>
      </form>
    </div>
  );
}
