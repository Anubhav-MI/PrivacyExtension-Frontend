import axios from "axios";
function App() {
  const fetchandSetData = async () => {
    const response = await axios.post("http://localhost:5000/scrapper");
    console.log(response);
  };
  return (
    <div className="App">
      <p>Extension</p>
    </div>
  );
}

export default App;
