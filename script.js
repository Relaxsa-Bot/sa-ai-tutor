const chat = async () => {
  const userInput = document.getElementById('userInput').value.trim();
  if (!userInput) return;

  // Display user message
  const chatBox = document.getElementById('chatMessages');
  chatBox.innerHTML += `<div class="user-msg">You: ${userInput}</div>`;

  try {
    // Call API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: userInput
        }]
      })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div class="ai-msg">Tutor: ${data.choices[0].message.content}</div>`;
    
  } catch (error) {
    chatBox.innerHTML += `<div class="error">Error: ${error.message}</div>`;
  }
};

document.getElementById('sendBtn').addEventListener('click', chat);
