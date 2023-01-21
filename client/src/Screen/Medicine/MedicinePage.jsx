import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const MedicinePage = () => {
  var medicines = [];
  useEffect(() => {
    axios.get("http://localhost:3000/get-medicines").then((resp) => {
      resp.data.map((val) => {
        medicines.push({ mname: val.mname, mcompany: val.mcompany });
      });
    });
  }, []);
  const TableStyles = {
    color: "black",
  };
  const columnStyles = {
    display: "flex",
    gap: "2rem",
  };
  console.log(medicines);
  return (
    <div>
      <table style={TableStyles}>
        <tr style={columnStyles}>
          <th>Name</th>
          <th>Company</th>
        </tr>
        {medicines.map((medicine) => {
          <tr style={columnStyles}>
            <td>{medicine.mname}</td>
            <td>{medicine.mcompany}</td>
          </tr>;
        })}
      </table>
    </div>
  );
};
export default MedicinePage;
