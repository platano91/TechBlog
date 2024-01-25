document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM fully loaded and parsed');
    }

    // Handle the signup form submission
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect the user input
        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value.trim();

        if (usernameInput && passwordInput) {
            // Prepare the user data
            const userData = {
                username: usernameInput,
                password: passwordInput
            };

            // Send a POST request to the server
            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    // If successful, redirect to the dashboard
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to sign up.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});
