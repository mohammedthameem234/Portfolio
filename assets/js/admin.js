document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const adminUsernameInput = document.getElementById('admin-username');
    const adminPasswordInput = document.getElementById('admin-password');
    const loginError = document.getElementById('login-error');
    const loginSection = document.getElementById('login-section');
    const messagesSection = document.getElementById('messages-section');
    const messagesTableBody = messagesSection.querySelector('tbody');
    const noMessagesMessage = document.getElementById('no-messages');

    let isAuthenticated = false; // Flag to track authentication status

    // Function to fetch messages from the backend
    async function fetchMessages(username, password) {
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

        try {
            const response = await fetch('/api/messages', {
                method: 'GET',
                headers: headers,
            });

            if (response.ok) {
                isAuthenticated = true;
                loginSection.classList.add('hidden');
                messagesSection.classList.remove('hidden');
                const messages = await response.json();
                renderMessages(messages);
            } else if (response.status === 401) {
                loginError.textContent = 'Invalid username or password.';
                loginError.classList.remove('hidden');
                isAuthenticated = false;
            } else {
                loginError.textContent = `Error: ${response.statusText}`;
                loginError.classList.remove('hidden');
                isAuthenticated = false;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            loginError.textContent = 'Network error or server unavailable.';
            loginError.classList.remove('hidden');
            isAuthenticated = false;
        }
    }

    // Function to render messages in the table
    function renderMessages(messages) {
        messagesTableBody.innerHTML = ''; // Clear existing messages
        if (messages.length === 0) {
            noMessagesMessage.classList.remove('hidden');
        } else {
            noMessagesMessage.classList.add('hidden');
            messages.forEach(msg => {
                const row = messagesTableBody.insertRow();
                row.insertCell().textContent = msg.id;
                row.insertCell().textContent = msg.name;
                row.insertCell().textContent = msg.email;
                row.insertCell().textContent = msg.subject || 'N/A';
                row.insertCell().textContent = msg.message;
                row.insertCell().textContent = new Date(msg.timestamp).toLocaleString();
            });
        }
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            loginError.classList.add('hidden'); // Hide previous errors
            const username = adminUsernameInput.value;
            const password = adminPasswordInput.value;
            await fetchMessages(username, password);
        });
    }
});
