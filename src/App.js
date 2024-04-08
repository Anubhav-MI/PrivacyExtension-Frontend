import axios from "axios";
import "./app.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAndSendData = async (text) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/summarize", {
        text,
      });
      console.log(response.data);
      setLoading(false);
      setText(response.data);
    } catch (error) {
      console.error("Error sending text to the backend:", error);
    }
  };

  useEffect(() => {
    const extractTermsAndConditions = () => {
      const termsAndConditionsText =
        "Terms and Conditions.These terms govern your use of our website ([website address]) and any services offered by [Your Company Name]. By using the website, you agree to these terms. If you disagree, you cannot use the website.Proper Use.You can only use the website legally. You agree not to use it to:.Break any laws.Harm or interfere with the website or other users.Post offensive or infringing content.Spread viruses or other harmful code.Intellectual Property.The website and its content, including text, graphics, logos, and software, belong to [Your Company Name] or its licensors and are protected by intellectual property laws. You cannot reproduce, modify, distribute, or commercially exploit this content without permission.Disclaimers.The website is provided as is without warranties. We disclaim all warranties, including merchantability, fitness for a purpose, and non-infringement. We do not guarantee the website will be uninterrupted or error-free, that defects will be corrected, or that the website or server is free of viruses.These terms constitute the entire agreement between you and us regarding your use of the website.We may revise these terms at any time by updating this posting. You are bound by any revisions and should periodically visit this page to review the current terms.Privacy Policy.This policy describes how [Your Company Name] collects, uses, and discloses your personal information when you use our website ([website address]).Information We Collect.We may collect the following information from you:Personal information you provide (name, email, contact information)Information collected automatically (IP address, browser type, browsing behavior)We may disclose your information to third-party service providers who help us operate the website and provide our services. They are obligated to keep your information confidential.";
      if (termsAndConditionsText) {
        fetchAndSendData(termsAndConditionsText);
      }
    };

    extractTermsAndConditions();
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
