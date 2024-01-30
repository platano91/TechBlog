document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // Function to handle the login submission
    const loginFormHandler = async (event) => {
        event.preventDefault();

        // Select the input elements and get their values
        const usernameInput = document.querySelector('#username').value.trim();
        const passwordInput = document.querySelector('#password').value.trim();

        if (usernameInput && passwordInput) {
            // Send a POST request to the server with the email and password
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username: usernameInput, password: passwordInput }),
                headers: { 'Content-Type': 'application/json' },
            });

            // If the response is OK, redirect to the dashboard page
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // If not, display an error message
                alert('Failed to log in');
            }
        }
    };

    // Attach the submit event to the login form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginFormHandler);
    }
});