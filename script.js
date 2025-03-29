const BACKEND_URL = "/api/chat"; // Now points to your Vercel function

document.getElementById("sendMessageBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput");
  const message = userInput.value.trim();
  if (!message) return;

  // Add user message to chat
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.innerHTML += `
    <div class="message user-message">
      <strong>You:</strong> ${message}
    </div>
  `;
  userInput.value = "";

  // Add loading indicator
  const loadingMsg = document.createElement("div");
  loadingMsg.className = "message ai-message";
  loadingMsg.innerHTML = "<em>AI is thinking...</em>";
  chatMessages.appendChild(loadingMsg);

  try {
    // Call your Vercel function
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { 
            role: "system", 
            content: "You are a South African CAPS curriculum tutor." 
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    loadingMsg.innerHTML = `
      <strong>AI Tutor:</strong> ${data.choices[0].message.content}
    `;
  } catch (error) {
    loadingMsg.innerHTML = `
      <strong>Error:</strong> Failed to get response (${error.message})
    `;
  }
});
