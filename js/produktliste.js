const productlistContainer = document.querySelector(".product-grid");


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

const header = document.querySelector("h2");

fetch(`https://kea-alt-del.dk/t7/api/products?limit=20&category=${category}`) 
  .then(res => res.json())
  .then(data => showProducts(data));


  header.innerHTML= `${category}`;
function showProducts(products){
  let markup = "";
  products.forEach(element => {
    // beregn førpris hvis der er discount
    let oldPrice = "";
    let discountTag = "";
    if(element.discount > 0){
      const before = Math.round(element.price / (1 - element.discount / 100));
      oldPrice = `<span class="old-price">Prev. DKK ${before},-</span>`;
      discountTag = `<div class="discount">-${element.discount}%</div>`;
    }

    // hvis udsolgt -> ingen link
    const productImage = element.soldout 
      ? `<img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="${element.productdisplayname}" />`
      : `<a href="produkt.html?id=${element.id}">
           <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="${element.productdisplayname}" />
         </a>`;

    markup += `
      <div class="product-card ${element.soldout ? "sold" : ""}">
        ${element.soldout ? `<span class="sold-out">Sold Out</span>` : ""}
        ${productImage}
        <div class="product-info">
          <div class="product-title">${element.productdisplayname}</div>
          <div class="product-meta">${element.articletype} - ${element.brandname}</div>
          <div class="product-price">
            ${oldPrice}
            Now DKK ${element.price},-
          </div>
          ${discountTag}
          <div class="read-more">${element.soldout ? "Unavailable" : "Read more"}</div>
        </div>
      </div>`;
  });
  productlistContainer.innerHTML = markup;
}
