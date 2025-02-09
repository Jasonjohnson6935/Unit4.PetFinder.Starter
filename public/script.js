const API_URL = `http://localhost:8080/api`;

const state = {
  pets: [],
}

/**
 * Fetches all pets from the API.
 * @returns {Object[]} the array of pet objects
 */
const fetchAllPets = async () => {
  try {
    const response = await fetch(API_URL)/v1/pets;
    const pets = await response.json();
    renderAllPets(pets);
  } catch (error) {
    console.error('Uh oh, trouble fetching pets:', error);
  }
};

// DOM elements
const $main = document.querySelector("main");

const createCard = ({
  name,
  id,
  breed,
  age,
  owner,
  telephone,
  appointments,
}) => {
  // Create elements
  const card = document.createElement("section");
  const div = document.createElement("div");
  const idInfo = document.createElement("h2");
  const nameInfo = document.createElement("p");
  const breedInfo = document.createElement("p");
  const ageInfo = document.createElement("p");
  const ownerInfo = document.createElement("p");
  const telephoneInfo = document.createElement("p");
  const appointmentsInfo = document.createElement("ul");

  // Add class names to the elements
  card.className = "card";

  const elements = [
    { element: nameInfo, info: name },
    { element: idInfo, info: `ID: ${id}` },
    { element: breedInfo, info: `Breed: ${breed}` },
    { element: ageInfo, info: `Age: ${age}` },
    { element: ownerInfo, info: `Owner: ${owner}` },
    { element: telephoneInfo, info: `Telephone: ${telephone}` },
  ];

  // Add pet information to the elements
  elements.forEach(({ element, info }) => {
    element.textContent = info;
    div.appendChild(element);
  });

  // Render appointments
  appointmentsInfo.textContent = "Appointments:";
  appointments.forEach((apt) => {
    const li = document.createElement("li");
    li.textContent = `${apt.date} at ${apt.time}: ${apt.reason}`;
    appointmentsInfo.appendChild(li);
  });
  div.appendChild(appointmentsInfo);

  card.appendChild(div);

  // Return the new DOM card
  return card;
};

/**
 * Updates `<main>` to display a list of all pets.
 */
const renderAllPets = (pets) => {
  $main.innerHTML = ''; // Clear existing content

  // Check if the list has pets
  if (pets.length === 0) {
    const message = document.createElement("h2");
    message.textContent = "No current pets";
    $main.appendChild(message);
    return;
  }

  // Render each pet
  pets.forEach((pet) => {
    const card = createCard(pet);
    $main.appendChild(card);
  });
};

const render = async () => {
  await fetchAllPets();
};

render();
