import './style.css';

//definerar type för Person
type Person = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  };
  
  // API url
  const urlPeople = "https://swapi.py4e.com/api/people/";
  
  // Denna funktion hämtar alla personer
  const fetchPeople = async (): Promise<Person[]> => {
    try {
      const response = await fetch(urlPeople);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: { results: Person[] } = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching people:", error);
      throw error;
    }
  };
  
  // Denna funktion för dropdown menyn
    const populateDropdown = async (people: Person[]) => {
    const dropdown = document.getElementById("dropdown") as HTMLSelectElement;
  
    // Rensa dropdown ska man tydligen ha..
    dropdown.innerHTML = '<option value="">Välj en karaktär...</option>';
  
    // Lägg till personer som alternativ
    people.forEach((person, index) => {
      const option = document.createElement("option");
      option.value = index.toString(); // Denna sparar index som ett värde.
      option.textContent = person.name;
      dropdown.appendChild(option);
    });
  };
  
  // Denna funktion kommer visa det valda personens information 
    const displayPersonInfo = (person: Person) => {
    const infoDiv = document.getElementById("person-info") as HTMLDivElement;
  
  // Rensa tidigare information
    infoDiv.innerHTML = "";
  
// Denna ska visa all information om det valda personen
    const infoHtml = `
      <h2>${person.name}</h2>
      <p><strong>Höjd:</strong> ${person.height} cm</p>
      <p><strong>Vikt:</strong> ${person.mass} kg</p>
      <p><strong>Hårfärg:</strong> ${person.hair_color}</p>
      <p><strong>Hudfärg:</strong> ${person.skin_color}</p>
      <p><strong>Ögonfärg:</strong> ${person.eye_color}</p>
      <p><strong>Födelseår:</strong> ${person.birth_year}</p>
      <p><strong>Kön:</strong> ${person.gender}</p>
      <p><strong>Hemvärld:</strong> ${person.homeworld}</p>
      <p><strong>Filmer:</strong> ${person.films.join(", ")}</p>
      <p><strong>Fordon:</strong> ${person.vehicles.length > 0 ? person.vehicles.join(", ") : "Inga"}</p>
      <p><strong>Rymdskepp:</strong> ${person.starships.length > 0 ? person.starships.join(", ") : "Inga"}</p>
    `;
    infoDiv.innerHTML = infoHtml;
  };
  
//Denna funktion hanterar det valet i dropdown
  const setupDropdownEvent = (people: Person[]) => {
    const dropdown = document.getElementById("dropdown") as HTMLSelectElement;
  
    dropdown.addEventListener("change", () => {
      const selectedIndex = dropdown.value;
      if (selectedIndex) {
        const selectedPerson = people[parseInt(selectedIndex)];
        displayPersonInfo(selectedPerson);
      } else {
        const infoDiv = document.getElementById("person-info") as HTMLDivElement;
        infoDiv.innerHTML = "<p>Välj en karaktär för att se detaljer.</p>";
      }
    });
  };
  
  // Initiera funktioner när sidan laddas
  document.addEventListener("DOMContentLoaded", async () => {
    const people = await fetchPeople();
    await populateDropdown(people);
    setupDropdownEvent(people);
  });
  