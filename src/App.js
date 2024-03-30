import axios from "axios";
import "./app.css";
function App() {
  const fetchandSetData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/scrapper", {
        url: "https://www.jpmorganchase.com/about/terms-and-conditions#:~:text=If%20you%20choose%20to%20link,Chase%20warrant%20that%20such%20site",
        // You can include any other relevant data here
      });
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
    }
  };
  fetchandSetData();
  return (
    <div className="App">
      <p>Extension</p>
    </div>
  );
}

export default App;
