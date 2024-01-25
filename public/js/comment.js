document.addEventListener('DOMContentLoaded', function () {

    const commentForm = document.getElementById('comment-form');

    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const commentText = document.getElementById('comment-text').value;

            if (commentText) {
                // Construct the comment data
                const commentData = {
                    text: commentText,
                    // Include any other relevant data, like the post ID
                    postId: commentForm.dataset.postId
                };

                // Send the comment data to the server
                fetch('/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(commentData),
                })
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    console.log('Comment submitted', data);
                    addCommentToPage(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        });
    }

    function addCommentToPage(comment) {
        // Select the element where you want to add the new comment
        const commentList = document.getElementById('comment-list');
        const newComment = document.createElement('div');
        
        // Add appropriate classes and structure for the comment
        newComment.classList.add('comment');
        newComment.innerHTML = `
            <p>${comment.text}</p>
            <small>Posted just now</small>
        `;

        // Append the new comment to the comment list
        commentList.appendChild(newComment);

        // Optionally, clear the comment input field
        document.getElementById('comment-text').value = '';
    }

});
