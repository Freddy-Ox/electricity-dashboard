import { useState, useEffect, useMemo } from "react";
import { ChartComponent } from "./components/components/Chart";
import { ButtonComponent } from "./components/components/Button";
import { LineChartComponent } from "./components/components/LineChart";
import { ButtonLoadingComponent } from "./components/components/LoadingButton";
import { ResizableComponent } from "./components/components/Resizable";

function App() {
  // hooks
  const [chartData, setChartData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartDate, setChartDate] = useState(new Date());

  ////
  // retrieve data for given day
  ////
  useEffect(() => {
    async function fetchDataForDate() {
      let shortDate = chartDate.toISOString().split("T")[0];
      let dateYear = shortDate.slice(0, 4);
      let dateMonth = shortDate.slice(5, 7);
      let dateDay = shortDate.slice(8, 10);

      try {
        const response = await fetch(
          `https://www.elprisenligenu.dk/api/v1/prices/${dateYear}/${dateMonth}-${dateDay}_DK1.json`
        );
        const data = await response.json();

        // step 4
        const mappedData = data.map((row) => ({
          hour: row.time_start.slice(11, 13), // Extract HH from timestamp
          kWh: row.DKK_per_kWh, // Ensure this field exists in API response
        }));

        // Step 5: Set the fetched data into the state
        setChartData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }
    fetchDataForDate();
  }, [chartDate]);

  ////
  // retrieve historical data
  ////
  useEffect(() => {
    async function fetchHistoricalData() {
      setLoading(true);

      try {
        let initDate = new Date("2022-11-01"); // retrieve data beginning at this date
        let incrementingDate = initDate; // iterator
        let currentDate = new Date(); // end retrieval on today's date

        // initialize data repo
        let tempData = [];

        while (initDate <= currentDate) {
          // some date formattting
          let shortDate = incrementingDate.toISOString().split("T")[0];
          let dateYear = shortDate.slice(0, 4);
          let dateMonth = shortDate.slice(5, 7);
          let dateDay = shortDate.slice(8, 10);

          const response = await fetch(
            `https://www.elprisenligenu.dk/api/v1/prices/${dateYear}/${dateMonth}-${dateDay}_DK1.json`
          );
          const data = await response.json();

          let mappedData = data.map((row) => ({
            hour: row.time_start.slice(11, 13),
            kWh: row.DKK_per_kWh,
          }));

          incrementingDate.setDate(incrementingDate.getDate() + 1);
          tempData.push(mappedData);
        }
        setHistoricalData(tempData);
      } catch (error) {
        console.error("error fetching data:", error);
        return [];
      }
      setLoading(false);
    }
    fetchHistoricalData();
  }, []);

  useEffect(() => {
    console.log("Loading state:", loading);
  }, [loading]);

  const avgPrice = useMemo(() => {
    if (!historicalData || historicalData.length === 0) return [];

    let date = new Date("2022-11-01");

    return historicalData.map((row) => {
      const result = {
        date: date.toISOString().slice(0, 10),
        kWh: row.reduce((sum, elem) => sum + (elem.kWh || 0), 0) / 24,
      };

      date.setDate(date.getDate() + 1); // Increment date
      return result;
    });
  }, [historicalData]);

  function handleIncrement() {
    setChartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }

  function handleDecrement() {
    setChartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);

      return newDate;
    });
  }

  function getDateString() {
    return `${chartDate.getDate()} ${chartDate.toLocaleString("en-US", {
      month: "long",
    })} ${chartDate.toISOString().slice(0, 4)}`;
  }
  function getDate(date) {
    return date.toISOString().slice(0, 10);
  }

  return (
    <>
      {/* Outer wrapper to ensure full width and centering */}
      <div className="w-screen flex flex-col items-center">
        {/* Chart Section */}
        <div className="mt-8">
          <ChartComponent chartData={chartData} dateString={getDateString()} />
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <ButtonComponent
            onClick={handleDecrement}
            dateChange="previous"
            chartDate={chartDate}
          >
            Previous Date
          </ButtonComponent>
          <p className="text-center">{getDateString()}</p>
          <ButtonComponent
            onClick={handleIncrement}
            dateChange="next"
            chartDate={chartDate}
          >
            Next Date{" "}
          </ButtonComponent>
        </div>

        <div className="leading-none text-muted-foreground mt-2">
          Note that data for tomorrow becomes available after 13.00
        </div>

        {/* Resizable Section */}
        <div className="w-[1000px] h-[200px] max-w-[1800px] flex justify-center mt-8">
          <ResizableComponent chartData={chartData} />
        </div>

        <br />

        {/* Line Chart Section */}
        <div className="w-full max-w-[1800px] flex justify-center mt-8">
          {!loading ? (
            <LineChartComponent chartData={avgPrice} />
          ) : (
            <ButtonLoadingComponent />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
