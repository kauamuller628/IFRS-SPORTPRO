let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, qty = 1) {
  const product = products.find((p) => p.id == id);
  if (!product) return;

  const item = cart.find((i) => i.id == id);

  if (item) {
    item.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart();
  alert("Produto adicionado ao carrinho");
}

function updateQty(id, qty) {
  qty = Number(qty);
  if (qty < 1) return;

  const item = cart.find((i) => i.id == id);
  if (!item) return;

  item.qty = qty;
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id != id);
  saveCart();
  renderCart();
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
