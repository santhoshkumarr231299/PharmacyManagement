import React from "react";
import Paper from "@mui/material/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

const App = () => {
  // Sample data
  const data = [
    { argument: "Monday", value: 30 },
    { argument: "Tuesday", value: 20 },
    { argument: "Wednesday", value: 10 },
    { argument: "Thursday", value: 50 },
    { argument: "Friday", value: 60 },
  ];
  console.log("hello");
  return (
    <Paper style={{ height: "350px" }}>
      <Chart data={data}>
        <ArgumentAxis tickSize={100} />
        <ValueAxis tickSize={100} />

        <LineSeries valueField="value" argumentField="argument" />
      </Chart>
    </Paper>
  );
};

export default App;
