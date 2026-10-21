// Airport Check-in and Boarding System
// Queue: check-in happens in arrival order (FIFO).
// Priority Queue behavior: priority passengers board first;
// passengers with the same priority board in check-in order.

const checkInQueue = [];
const boardingQueue = [];
let nextOrder = 1;

const form = document.getElementById("passengerForm");
const nameInput = document.getElementById("passengerName");
const priorityInput = document.getElementById("priority");
const checkInList = document.getElementById("checkInList");
const boardingList = document.getElementById("boardingList");
const checkInCount = document.getElementById("checkInCount");
const boardingCount = document.getElementById("boardingCount");
const message = document.getElementById("message");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function priorityLabel(passenger) {
  return passenger.priority === 2 ? "Priority" : "Regular";
}

function createPassengerCard(passenger, number) {
  const card = document.createElement("div");
  card.className = "passenger-card";

  const info = document.createElement("div");
  const name = document.createElement("span");
  name.className = "passenger-name";
  name.textContent = passenger.name;

  const passengerNumber = document.createElement("span");
  passengerNumber.className = "passenger-number";
  passengerNumber.textContent = `Passenger #${number}`;

  name.appendChild(passengerNumber);
  info.appendChild(name);

  const badge = document.createElement("span");
  badge.className = `badge ${passenger.priority === 2 ? "priority" : "regular"}`;
  badge.textContent = priorityLabel(passenger);

  card.appendChild(info);
  card.appendChild(badge);
  return card;
}

function renderList(container, passengers, emptyText, sortForBoarding = false) {
  container.replaceChildren();

  if (passengers.length === 0) {
    container.className = "passenger-list empty";
    container.textContent = emptyText;
    return;
  }

  container.className = "passenger-list";
  const displayPassengers = sortForBoarding
    ? [...passengers].sort((a, b) => b.priority - a.priority || a.order - b.order)
    : passengers;

  displayPassengers.forEach((passenger, index) => {
    container.appendChild(createPassengerCard(passenger, index + 1));
  });
}

function render() {
  renderList(
    checkInList,
    checkInQueue,
    "No passengers waiting for check-in."
  );
  renderList(
    boardingList,
    boardingQueue,
    "No passengers ready for boarding.",
    true
  );

  checkInCount.textContent =
    `${checkInQueue.length} ${checkInQueue.length === 1 ? "passenger" : "passengers"}`;
  boardingCount.textContent =
    `${boardingQueue.length} ${boardingQueue.length === 1 ? "passenger" : "passengers"}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const priority = Number(priorityInput.value);

  if (!name) {
    showMessage("Please enter a passenger name.", true);
    nameInput.focus();
    return;
  }

  checkInQueue.push({
    name,
    priority,
    order: nextOrder++
  });

  render();
  showMessage(`${name} added to the check-in queue.`);
  form.reset();
  nameInput.focus();
});

document.getElementById("processCheckIn").addEventListener("click", () => {
  if (checkInQueue.length === 0) {
    showMessage("No passengers are waiting for check-in.", true);
    return;
  }

  const passenger = checkInQueue.shift();
  boardingQueue.push(passenger);
  render();
  showMessage(`${passenger.name} checked in successfully.`);
});

document.getElementById("boardPassenger").addEventListener("click", () => {
  if (boardingQueue.length === 0) {
    showMessage("No passengers are ready for boarding.", true);
    return;
  }

  // Select highest priority. For equal priority, select earliest check-in.
  let selectedIndex = 0;
  for (let i = 1; i < boardingQueue.length; i++) {
    const current = boardingQueue[i];
    const selected = boardingQueue[selectedIndex];

    if (
      current.priority > selected.priority ||
      (current.priority === selected.priority && current.order < selected.order)
    ) {
      selectedIndex = i;
    }
  }

  const [passenger] = boardingQueue.splice(selectedIndex, 1);
  render();
  showMessage(`${passenger.name} has boarded the flight.`);
});

document.getElementById("resetSystem").addEventListener("click", () => {
  const confirmed = window.confirm("Clear all passengers and reset the demonstration?");
  if (!confirmed) return;

  checkInQueue.length = 0;
  boardingQueue.length = 0;
  nextOrder = 1;
  render();
  showMessage("The demonstration has been reset.");
});

render();
