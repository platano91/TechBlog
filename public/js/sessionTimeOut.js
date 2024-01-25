// Duration for inactivity timeout (e.g., 15 minutes in milliseconds)
const TIMEOUT_DURATION = 15 * 60 * 1000;

let timeout;

// Function to log out the user
function logoutUser() {
    // Send a logout request to your server
    fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (response.ok) {
            // Redirect to login page or homepage after logout
            window.location.href = '/login';
        } else {
            // Handle any errors if logout fails
            alert('Logout failed.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to reset the timeout timer
function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(logoutUser, TIMEOUT_DURATION);
}

// Add event listeners for user actions
window.onload = resetTimeout;
window.onmousemove = resetTimeout;
window.onmousedown = resetTimeout;  // Catches touchscreen presses
window.onclick = resetTimeout;      // Catches touchpad clicks
window.onscroll = resetTimeout;     // Catches scrolling with arrow keys
window.onkeypress = resetTimeout;

// Initialize the timer
resetTimeout();
