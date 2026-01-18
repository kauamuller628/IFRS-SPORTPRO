const products = [
  {
    id: 1,
    name: "Camiseta Pro Dry",
    price: 129.9,
    category: "camiseta",
    image: "https://picsum.photos/400/400?random=1",
    date: 2024,
  },
  {
    id: 2,
    name: "Tênis Performance X",
    price: 399.9,
    category: "calcado",
    image: "https://picsum.photos/400/400?random=2",
    date: 2023,
  },
  {
    id: 3,
    name: "Luvas Training Grip",
    price: 89.9,
    category: "acessorio",
    image: "https://picsum.photos/400/400?random=3",
    date: 2024,
  },
  {
    id: 4,
    name: "Camiseta Compressão Elite",
    price: 159.9,
    category: "camiseta",
    image: "https://picsum.photos/400/400?random=4",
    date: 2022,
  },
  {
    id: 5,
    name: "Tênis Speed Run",
    price: 499.9,
    category: "calcado",
    image: "https://picsum.photos/400/400?random=5",
    date: 2024,
  },
];

const grid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const sortFilter = document.getElementById("sortFilter");

function renderProducts(list) {
  grid.innerHTML = "";

  list.forEach((p) => {
    grid.innerHTML += `
      <div class="bg-white rounded-2xl shadow p-5 flex flex-col">
        <img src="${p.image}" class="rounded-xl mb-4">
        <h3 class="font-semibold mb-1">${p.name}</h3>
        <p class="text-black font-bold mb-4">R$ ${p.price.toFixed(2)}</p>

        <a href="product.html?id=${p.id}"
          class="mb-3 text-center border border-black text-black py-2 rounded-lg hover:bg-black-50">
          Ver detalhes
        </a>

        <button onclick="addToCart(${p.id})"
          class="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
          Adicionar ao Carrinho
        </button>
      </div>
    `;
  });
}

function applyFilters() {
  let filtered = [...products];

  const category = categoryFilter.value;
  const maxPrice = Number(priceFilter.value);
  const sort = sortFilter.value;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  filtered = filtered.filter((p) => p.price <= maxPrice);

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }
  if (sort === "newest") {
    filtered.sort((a, b) => b.date - a.date);
  }

  renderProducts(filtered);
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produto adicionado ao carrinho!");
}

priceFilter.addEventListener("input", () => {
  priceValue.innerText = priceFilter.value;
  applyFilters();
});

categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

priceValue.innerText = priceFilter.value;
renderProducts(products);
