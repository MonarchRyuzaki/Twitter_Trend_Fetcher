import { Button, Skeleton } from "antd";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://twitter-trend-fetcher-backend.onrender.com/getTrends");
        // const res = await fetch("http://localhost:8080/getTrends");
        const response = await res.json();
        console.log(response);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [buttonClicked]);

  return (
    <div className="container">
      <h1 className="heading">Trending Topics</h1>
      <Button
        className="button"
        onClick={() => setButtonClicked((prev) => !prev)}
        type="primary"
      >
        {loading ? "Fetching Trends..." : "Fetch Latest Trends"}
      </Button>
      <br />
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <p className="bold">
            These are the most happening topics as on {data.end_date.toLocaleString()}:
          </p>
          <ul className="trend-list">
            <li>
              <span className="bold">Trend 1:</span>{" "}
              <span className="blue">{data.trend1}</span>
            </li>
            <li>
              <span className="bold">Trend 2:</span>{" "}
              <span className="green">{data.trend2}</span>
            </li>
            <li>
              <span className="bold">Trend 3:</span>{" "}
              <span className="red">{data.trend3}</span>
            </li>
            <li>
              <span className="bold">Trend 4:</span>{" "}
              <span className="purple">{data.trend4}</span>
            </li>
            <li>
              <span className="bold">Trend 5:</span>{" "}
              <span className="orange">{data.trend5}</span>
            </li>
          </ul>
          <p>
            <span className="bold">
              The IP address used for this query was:
            </span>{" "}
            <span className="bold">{data.ipAddress}</span>.
          </p>
          <p className="bold">
            Here&apos;s a JSON extract of this record from the MongoDB:
          </p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Button
            onClick={() => setButtonClicked((prev) => !prev)}
            type="primary"
          >
            {!loading && "Click to run this query again"}
          </Button>
        </>
      )}
    </div>
  );
};

export default App;
