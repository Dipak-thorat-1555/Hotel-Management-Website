
/* =====================================
   STAYAURA HOTEL MANAGEMENT WEBSITE
   JavaScript Functionality
   ===================================== */

// Select HTML elements
const bookingForm = document.getElementById("bookingForm");

const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");

const guestsInput = document.getElementById("guests");
const bookingMessage = document.getElementById("bookingMessage");

const bookRoomButtons = document.querySelectorAll(".book-room");

let selectedRoom = "Any Available Room";

// =====================================
// SET MINIMUM BOOKING DATE
// =====================================

function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const todayDate = getTodayDate();

checkinInput.min = todayDate;
checkoutInput.min = todayDate;

// =====================================
// UPDATE CHECKOUT MINIMUM DATE
// =====================================

checkinInput.addEventListener("change", function () {

    const checkinDate = checkinInput.value;

    // Checkout must be after check-in
    checkoutInput.min = checkinDate || todayDate;

    if (
        checkoutInput.value &&
        checkinDate &&
        checkoutInput.value <= checkinDate
    ) {
        checkoutInput.value = "";
    }

    bookingMessage.textContent = "";
});

// =====================================
// BOOK ROOM BUTTONS
// =====================================

bookRoomButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedRoom = button.dataset.room;

        // Scroll to booking form
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Show selected room
        bookingMessage.textContent =
            selectedRoom + " selected! Please complete your booking details.";

        bookingMessage.style.color = "#9c7134";

    });

});

// =====================================
// BOOKING FORM SUBMISSION
// =====================================

bookingForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    const checkinDate = checkinInput.value;
    const checkoutDate = checkoutInput.value;

    const guests = Number(guestsInput.value);

    // Validate required dates
    if (!checkinDate || !checkoutDate) {

        showMessage(
            "Please select both check-in and check-out dates.",
            "red"
        );

        return;
    }

    // Validate past check-in date
    if (checkinDate < getTodayDate()) {

        showMessage(
            "Check-in date cannot be in the past.",
            "red"
        );

        return;
    }

    // Validate checkout date
    if (checkoutDate <= checkinDate) {

        showMessage(
            "Check-out must be after check-in.",
            "red"
        );

        return;
    }

    // Validate number of guests
    if (!Number.isInteger(guests) || guests < 1 || guests > 4) {

        showMessage(
            "Please select between 1 and 4 guests.",
            "red"
        );

        return;
    }

    // Calculate number of nights
    const checkin = new Date(checkinDate + "T00:00:00");

    const checkout = new Date(checkoutDate + "T00:00:00");

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const nights = Math.round(
        (checkout - checkin) / millisecondsPerDay
    );

    // Display booking demo confirmation
    showMessage(
        "Booking request received! " +
        "Room: " + selectedRoom +
        " | Guests: " + guests +
        " | Nights: " + nights +
        ". This is a demo; no real reservation has been made.",
        "green"
    );

});

// =====================================
// DISPLAY MESSAGES
// =====================================

function showMessage(message, color) {

    bookingMessage.textContent = message;

    bookingMessage.style.color = color;

    bookingMessage.style.lineHeight = "1.8";

}

// =====================================
// FOOTER YEAR
// =====================================

console.log("StayAura Hotel Website loaded successfully!");