document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // Handle the form submission for creating or updating a post
    const postForm = document.getElementById('post-form');
    
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect the post data
            const postData = {
                title: document.getElementById('post-title').value.trim(),
                content: document.getElementById('post-content').value.trim(),
                // Add any other fields you have in your form
            };

            const postId = document.getElementById('post-id').value;
            const url = postId ? `/api/posts/${postId}` : '/api/posts';
            const method = postId ? 'PUT' : 'POST';

            // Send the request to the server
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
            .then((response) => {
                if (response.ok) {
                    console.log('Post submitted successfully');
                    // Redirect to the dashboard or reload page
                    window.location.href = '/dashboard';
                } else {
                    alert('Failed to submit post');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
