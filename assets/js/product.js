const product = {
  id: 1,
  name: "Camiseta Esportiva Pro",
  price: 149.9,
  images: [
    "https://picsum.photos/600/600?random=10",
    "https://picsum.photos/600/600?random=11",
    "https://picsum.photos/600/600?random=12",
  ],
  sizes: ["P", "M", "G", "GG"],
  colors: ["Preto", "Azul", "Vermelho"],
};

let selectedSize = null;
let selectedColor = null;

// INICIALIZA A PÁGINA
function loadProduct() {
  document.getElementById("productName").innerText = product.name;
  document.getElementById(
    "productPrice"
  ).innerText = `R$ ${product.price.toFixed(2)}`;
  document.getElementById("mainImage").src = product.images[0];

  renderThumbnails();
  renderSizes();
  renderColors();
}

function renderThumbnails() {
  const container = document.getElementById("thumbnails");
  container.innerHTML = "";

  product.images.forEach((img) => {
    const image = document.createElement("img");
    image.src = img;
    image.className =
      "w-20 h-20 rounded-lg cursor-pointer border hover:border-red-600 object-cover";
    image.onclick = () => (document.getElementById("mainImage").src = img);
    container.appendChild(image);
  });
}

function renderSizes() {
  const container = document.getElementById("sizes");
  container.innerHTML = "";

  product.sizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.innerText = size;
    btn.className = "px-4 py-2 border rounded-lg";
    btn.onclick = () => {
      selectedSize = size;
      [...container.children].forEach((b) =>
        b.classList.remove("bg-black", "text-white")
      );
      btn.classList.add("bg-black", "text-white");
    };
    container.appendChild(btn);
  });
}

function renderColors() {
  const container = document.getElementById("colors");
  container.innerHTML = "";

  product.colors.forEach((color) => {
    const btn = document.createElement("button");
    btn.innerText = color;
    btn.className = "px-4 py-2 border rounded-lg";
    btn.onclick = () => {
      selectedColor = color;
      [...container.children].forEach((b) =>
        b.classList.remove("bg-black", "text-white")
      );
      btn.classList.add("bg-black", "text-white");
    };
    container.appendChild(btn);
  });
}

function addToCart() {
  if (!selectedSize || !selectedColor) {
    alert("Selecione tamanho e cor.");
    return;
  }

  const quantity = parseInt(document.getElementById("quantity").value);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}

loadProduct();
