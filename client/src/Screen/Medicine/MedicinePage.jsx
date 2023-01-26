import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function MedicinePageManager() {
  const [isAddMedClicked, setAddMedClicked] = useState(false);
  const changeStatus = (val) => {
    setAddMedClicked(val);
  };
  const getMedPage = () => {
    switch (isAddMedClicked) {
      case true:
        return <AddMedicinePage />;
      default:
        return <MedicinePage addMedStatus={changeStatus} />;
    }
  };
  return <>{getMedPage()}</>;
}

function MedicinePage(props) {
  const [medicines, setMedicines] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  useEffect(() => {
    let temp = [];
    let counter = 0;
    axios.get("http://localhost:3000/get-medicines").then((resp) => {
      setMedicines(resp.data);
      resp.data.forEach((da) => {
        temp.push({ id: ++counter, mname: da.mname, mcompany: da.mcompany });
      });
      setDataGridRows(temp);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "mname", headerName: "Medicine Name", width: 130 },
    { field: "mcompany", headerName: "Company Name", width: 130 },
  ];
  console.log(medicines);
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={dataGridRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

function AddMedicinePage(props) {
  const [dateType, setDateType] = useState(true);
  const changeType = (e, val) => {
    e.preventDefault();
    setDateType(val);
  };
  return (
    <div className="new-medicine">
      <div class="main-title">
        <h1>New Medicine</h1>
      </div>
      <div class="main-form">
        <form name="event">
          <input
            type="text"
            id="cname"
            placeholder="Medicine Name"
            onFocus={(e) => changeType(e, true)}
          />
          <input
            type="number"
            id="cnumber"
            placeholder="Company Name"
            onFocus={(e) => changeType(e, true)}
          />
          <input
            type="text"
            id="clocation"
            placeholder="Location"
            onFocus={(e) => changeType(e, true)}
          />

          <div class="input-group">
            <input
              type={dateType ? "text" : "date"}
              onFocus={(e) => changeType(e, false)}
              id="fdate"
              placeholder="Expiry Date"
            />
            {/* <label for="fallday" class="all_day">
              All day:
            </label>
            <input type="checkbox" class="checkbox" id="fallday" /> */}
          </div>

          <div class="input-hour">
            <div id="fhourdiv">
              <input
                type="time"
                id="fstart"
                class="hour"
                onFocus={(e) => changeType(e, true)}
              />
              <input
                type="time"
                id="fend"
                class="hour"
                onFocus={(e) => changeType(e, true)}
              />
            </div>
          </div>

          <input type="submit" id="fsubmit" value="Save" class="button" />
        </form>
      </div>
    </div>
  );
}
