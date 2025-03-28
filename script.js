const BACKEND_URL = "https://your-deno-deploy-url.deno.dev"; // You'll update this later

document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);

async function sendMessage() {
    const message = document.getElementById('userInput').value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    chatMessages.innerHTML += <div class="user-message">${message}</div>;
    document.getElementById('userInput').value = '';
    
    try {
        // Call your backend
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: "user", content: message }] })
        });
        
        const data = await response.json();
        chatMessages.innerHTML += <div class="ai-message">${data.choices[0].message.content}</div>;
    } catch (error) {
        chatMessages.innerHTML += '<div class="error-message">Error getting response</div>';
    }
}
