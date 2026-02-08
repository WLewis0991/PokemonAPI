//Pokemon API

const img = document.querySelector("img");
const input = document.querySelector("input");
const output = document.querySelector(".output");
const pokeNumber = document.querySelector(".pokeNumber");
const type = document.querySelector(".type");
//Event Listener
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  const pokemon = input.value.trim().toLowerCase();
  //Error for empty input
  if (!pokemon) {
    pokeNumber.textContent = "";
    type.textContent = "";
    img.src = "imgs/questionMark.svg";
    output.textContent = "TRY AGAIN";
    return;
  }
  //Fetching of pokemon API
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Not found");
      }
      return response.json();
    })
    //Data from API
    .then((data) => {
      pokeNumber.textContent = `#: ${data.id}`;
      type.textContent = `Type:${data.types[0].type.name}`;
      img.src = data.sprites.front_default;
      output.textContent = data.name.toUpperCase();
    })
    //Error if pokemon is not found
    .catch(() => {
      pokeNumber.textContent = "";
      type.textContent = "";
      img.src = "imgs/questionMark.svg";
      output.textContent = "TRY AGAIN";
    });
  //Clear input
  input.value = "";
}});
