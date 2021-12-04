import React from "react";
import history from "./History";

// Component for displaying a table of all the colors in the database. Each may be selected to see more info. There is also an add button for nabigating to the add color component
export default function Colors({ colors }) {
  const selectColor = (color) => () => {
    history.push("/color/" + color.id);
  };

  const addColor = () => {
    history.push("/add");
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Colors</h1>
      </div>
      <div className="list-group" style={{ textAlign: "center" }}>
        <table align="center">
          <tr>
            <th>Name</th>
            <th>Hex</th>
            <th>Timestamp</th>
          </tr>
          {colors?.map((color) => (
            <tr style={{ backgroundColor: color.hex }} key={color.id}>
              <td>
                <button
                  className="list-group-item"
                  active
                  onClick={selectColor(color)}
                >
                  {color.name}
                </button>
              </td>
              <td>{color.hex}</td>
              <td>{color.timestamp}</td>
            </tr>
          ))}
          <tr>
            <td>
              <button
                className="list-group-item"
                active
                onClick={addColor}
                style={{ textAlign: "center" }}
              >
                Add
              </button>
            </td>
            <td>#______</td>
            <td>0123456789ABCDEF</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
