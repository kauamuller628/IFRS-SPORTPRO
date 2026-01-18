const featuredContainer = document.getElementById("featuredProducts");
const searchInput = document.getElementById("searchInput");

function renderProducts(list) {
  featuredContainer.innerHTML = "";
  list.forEach((p) => {
    featuredContainer.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${p.images[0]}" class="card-img-top">
          <div class="card-body">
            <h5>${p.name}</h5>
            <p>R$ ${p.price.toFixed(2)}</p>
            <a href="product.html?id=${
              p.id
            }" class="btn btn-primary">Ver Produto</a>
          </div>
        </div>
      </div>
    `;
  });
}

searchInput?.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(value));
  renderProducts(filtered);
});

renderProducts(products);
