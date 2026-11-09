
/* =========================
   1. Flight Data
========================= */

const flights = [
    {
        id: 1,
        from: "Dubai",
        to: "London",
        airline: "Emirates",
        departure: "2026-12-12 · 08:30",
        duration: "7h 45m",
        price: 350,
        image: "images/pexels-muberra-yildirim-748462806-28530775.jpg"
    },
    {
        id: 2,
        from: "Paris",
        to: "Rome",
        airline: "Sky Europe",
        departure: "2026-12-15 · 10:15",
        duration: "2h 05m",
        price: 180,
        image:  "images/pexels-muberra-yildirim-748462806-28530775.jpg"
    },
    {
        id: 3,
        from: "Amsterdam",
        to: "Barcelona",
        airline: "Vueling",
        departure: "2026-12-18 · 14:20",
        duration: "2h 30m",
        price: 220,
        image: "images/pexels-muberra-yildirim-748462806-28530775.jpg"
    }
];


/* =========================
   2. DOM Elements
========================= */

const cardsContainer = document.querySelector("#cards");
const totalPriceElement = document.querySelector("#totalPrice");
const summaryTextElement = document.querySelector("#summaryText");
const bookingForm = document.querySelector("#bookingForm");
const formMessage = document.querySelector("#formMessage");

let selectedFlight = null;


/* =========================
   3. Format Price
========================= */

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);
}


/* =========================
   4. Render Flights
========================= */

function renderFlights() {

    cardsContainer.innerHTML = flights.map((flight) => `
        <div class="col-12 col-md-6 col-lg-4">

            <article class="card flight-card">

                <img
                    src="${flight.image}"
                    class="card-img-top"
                    alt="Airplane representing the ${flight.from} to ${flight.to} route"
                >

                <div class="card-body">

                    <h3 class="flight-route">
                        ${flight.from}
                        <span aria-hidden="true">→</span>
                        ${flight.to}
                    </h3>

                    <p class="flight-meta">
                        <strong>Airline:</strong> ${flight.airline}
                    </p>

                    <p class="flight-meta">
                        <strong>Departure:</strong> ${flight.departure}
                    </p>

                    <p class="flight-meta">
                        <strong>Duration:</strong> ${flight.duration}
                    </p>

                    <div class="flight-bottom">

                        <span class="flight-price">
                            ${formatPrice(flight.price)}
                        </span>

                        <button
                            type="button"
                            class="btn btn-primary select-flight"
                            data-flight-id="${flight.id}"
                        >
                            Select flight
                        </button>

                    </div>

                </div>

            </article>

        </div>
    `).join("");

}


/* =========================
   5. Update Booking Summary
========================= */

function updateBookingSummary() {

    if (!selectedFlight) {

        summaryTextElement.textContent =
            "No flight selected yet.";

        totalPriceElement.textContent =
            formatPrice(0);

        return;
    }

    summaryTextElement.textContent =
        `${selectedFlight.from} → ${selectedFlight.to} · ${selectedFlight.airline}`;

    totalPriceElement.textContent =
        formatPrice(selectedFlight.price);

}


/* =========================
   6. Select Flight
========================= */

cardsContainer.addEventListener("click", (event) => {

    const button = event.target.closest(".select-flight");

    if (!button) return;

    const flightId = Number(button.dataset.flightId);

    selectedFlight =
        flights.find((flight) => flight.id === flightId) ?? null;

    updateBookingSummary();

    document.querySelectorAll(".select-flight").forEach((flightButton) => {

        flightButton.textContent = "Select flight";

        flightButton.classList.remove("btn-success");
        flightButton.classList.add("btn-primary");

    });

    button.textContent = "Selected";

    button.classList.remove("btn-primary");
    button.classList.add("btn-success");

});


/* =========================
   7. Booking Form
========================= */

bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "form-message mt-3 mb-0";

    if (!selectedFlight) {

        formMessage.textContent =
            "Please select a flight before submitting the request.";

        formMessage.classList.add("error");

        return;
    }

    if (!bookingForm.checkValidity()) {

        bookingForm.classList.add("was-validated");

        formMessage.textContent =
            "Please check the highlighted fields.";

        formMessage.classList.add("error");

        return;
    }

    const formData = new FormData(bookingForm);

    const passengerName =
        String(formData.get("fullName")).trim();

    formMessage.textContent =
        `Thank you, ${passengerName}. Your demo request for ${selectedFlight.from} → ${selectedFlight.to} has been prepared. No real booking or payment was made.`;

    formMessage.classList.add("success");

    bookingForm.reset();

    bookingForm.classList.remove("was-validated");

});


/* =========================
   8. Current Year
========================= */

document.querySelector("#currentYear").textContent =
    new Date().getFullYear();


/* =========================
   9. Initialize Application
========================= */

renderFlights();

updateBookingSummary();
