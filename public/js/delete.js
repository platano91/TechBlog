document.addEventListener('DOMContentLoaded', (event) => {
    if (event.target && event.target.className === 'delete-post-btn') {
        event.target.addEventListener('click', deletePost);
    }
});

async function deletePost(event) {
    const postId = event.target.getAttribute('data-id');

    if (postId) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Option 1: Remove the post element from the page
            document.querySelector(`#post-${postId}`).remove();

            // Option 2: Refresh the page
            // location.reload();
        } else {
            alert('Failed to delete the post');
        }
    }
}
