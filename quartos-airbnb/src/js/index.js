const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const cardsContainer = document.querySelector("#cards");
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

let data = [];

async function fetchData() {
  return await fetch(apiUrl).then(async (result) => {
    return await result.json();
  });
}

function renderCards(cards) {
  cardsContainer.innerHTML = "";
  cards.map(renderCard);
}

function renderCard(card) {
  const div = document.createElement("div");
  div.style.width = "20rem";
  div.style.margin = "1rem";
  div.className = "card";
  div.innerHTML = `
        <img src="${card.photo}" class="card-img-top" alt="${card.name}" />
        <div class="card-body">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text">
                Tipo: ${card.property_type}
            </p>
            <p class="card-text">
                Preço: ${currencyFormatter.format(card.price)}
            </p>
        </div>
    `;
  cardsContainer.appendChild(div);
}

function filterData(filter) {
  
  if (filter === "Todos") {
    renderCards(data);
  } else {
    renderCards(data.filter((card) => card.property_type === filter));
  }
}

async function main() {
  data = await fetchData();

  if (data[0]) {
    renderCards(data);
  }
}

main();
