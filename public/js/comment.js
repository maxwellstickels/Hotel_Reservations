const bw = require('bad-words');
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const reservation_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
      var Filter = require('bad-words'),
      filter = new Filter();
      const comment_filter = filter.clean(comment_text);
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            reservation_id,
            comment_filter
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);