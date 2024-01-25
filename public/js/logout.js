// Assuming your logout button has an id 'logout'
const logoutButton = document.getElementById('logout');

if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            // Send a POST request to the server's logout route
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            // Check the response from the server
            if (response.ok) {
                // If logout is successful, redirect to the homepage
                document.location.replace('/');
            } else {
                alert('Failed to log out.');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    });
} else {
    console.error('Logout button not found');
}
