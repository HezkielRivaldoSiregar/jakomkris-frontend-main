import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default function VaksinChart() {
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    axios
      .get("https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian")
      .then(result => {
        setLabel(Object.keys(result.data).map(key => result.data[key].tanggal));
        setData(Object.keys(result.data).map(key => result.data[key].positif_kumulatif));
      });
  }, []);

  return (
    <div>
      <Line
        data={{
          labels: label,
          datasets: [
            {
              label: "Kasus Covid Positif Harian",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: data
            }
          ]
        }}
      />
    </div>
  );
}
