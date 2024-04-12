document.addEventListener("DOMContentLoaded", function () {
  // Display loader
  document.getElementById("loader").style.display = "block";

  // Get the URL of the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentPageUrl = tabs[0].url;

    // Send the URL to the backend
    fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPageUrl }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Parse response as text
      })
      .then((data) => {
        // Hide loader
        document.getElementById("loader").style.display = "none";

        // Display text as list
        const textArea = document.getElementById("textArea");
        const sentences = data.split(". ").map((sentence) => sentence.trim()); // Split by sentences
        // Remove the first line containing the URL
        const textWithoutURL = sentences.slice(1).join(". ");
        const sentencesWithoutURL = textWithoutURL
          .split(". ")
          .map((sentence) => sentence.trim()); // Split by sentences again
        sentencesWithoutURL.forEach((sentence) => {
          const listItem = document.createElement("li");
          listItem.textContent = sentence;
          textArea.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Hide loader and display error message
        document.getElementById("loader").style.display = "none";
        document.getElementById("textArea").textContent = "Error loading data";
      });
  });
});
