async function newFormHandler(event) {
    event.preventDefault();

    const reservation = document.querySelector('input[name="reservation"]').value;
    const reservation = document.querySelector('textarea[name="room"]').value;

    const response = await fetch(`/api/reservation`, {
      method: 'POST',
      body: JSON.stringify({
        reservation,
        room
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-reservation-form').addEventListener('submit', newFormHandler);