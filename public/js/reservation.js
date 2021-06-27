// const helpers = require('./unformat_date');

function unformat_date(date) {
  //const timeZone = new TimeZone();
  //timeZone = TimeZone.getTimeZone("GMT+0:00");
  //TimeZone.setDefault(timeZone);
  const regex = /-/g;
  date.replace(regex, ".");
  return `${Math.ceil(new Date(date).getTime())}`;
}

async function newFormHandler(event) {
  event.preventDefault();
  if (empty()) {
    // var room = $("#room").val();
    var checkin = unformat_date($("#checkin").val());
    var checkout = unformat_date($("#checkout").val());
    console.log(checkin + " " + checkout);
    const response = await fetch(`/api/reservations`, {
      method: "POST",
      body: JSON.stringify({
        // room,
        start_date: checkin,
        end_date: checkout,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}
  
document.querySelector('.new-reservation-form').addEventListener('submit', newFormHandler);

function empty() {
    var room = $("#room").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var checkin = $("#checkin").val();
    var checkout = $("#checkout").val();
    var validate = true;
    if (!email) {
      $("#email-validate").show();
      validate = false;
    }
    else if (email) {
      $("#email-validate").hide();
    }
    if (!firstname) {
      $("#firstname-validate").show();
      validate = false;
    }
    else if (firstname) {
      $("#firstname-validate").hide();
    }
    if (!lastname) {
      $("#lastname-validate").show();
      validate = false;
    }
    else if (lastname) {
      $("#lastname-validate").hide();
    }
    if (!phone) {
      $("#phone-validate").show();
      validate = false;
    }
    else if (phone) {
      $("#phone-validate").hide();
    }
    if (!checkin) {
      $("#checkin-validate").show();
      validate = false;
    }
    else if (checkin) {
      $("#checkin-validate").hide();
    }
    if (!checkout) {
      $("#checkout-validate").show();
      validate = false;
    }
    else if (checkout) {
      $("#checkout-validate").hide();
    }
    if (!room) {
      $("#room-validate").show();
      validate = false;
    }
    else if (room) {
      $("#room-validate").hide();
    }
    return validate;
  }