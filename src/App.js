import axios from "axios";
import "./app.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const currentPageUrl = window.location.href;
  // console.log(currentPageUrl);

  const fetchAndSendData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/summarize", {
        currentPageUrl,
      });
      // console.log(response.data);
      setLoading(false);
      setText(response.data);
    } catch (error) {
      console.error("Error sending text to the backend:", error);
    }
  };

  useEffect(() => {
    fetchAndSendData();
  }, []);

  return (
    <div className="App">
      <p className="head">TERMS AND CONDITIONS</p>
      <div className="text-area">
        {
          loading && (
            <div className="loader">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          ) /* Loading spinner */
        }
        {!loading &&
          text
            .split(".")
            .slice(0, -1)
            .map((line, index) => (
              <ul key={index}>
                <li>
                  <span>{line.trim()}</span>
                  <br />
                </li>
              </ul>
            ))}
      </div>
    </div>
  );
}

export default App;
