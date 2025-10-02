const productlistContainer = document.querySelector(".product-grid");


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

const header = document.querySelector("h2");

document.querySelectorAll("#filters button").forEach(knap=>knap.addEventListener("click", showFiltered));
document.querySelectorAll("#sorting").forEach(knap=>knap.addEventListener("click", showSorted));

function showSorted(event){
const direction =event.target.dataset.direction;
console.log(allData);
if (direction=="lohi"){
  console.log(allData);
    allData.sort((a,b) => a.price - b.price);
}else{
       allData.sort((a,b) => b.price - a.price);
}
showProducts (allData);
}

function showFiltered(event) {
  const gender = event.target.dataset.gender; 
  console.log("Filter valgt:", gender);

  if (gender === "All") {
    showProducts(allData);
  } else {
    const udsnit = allData.filter(product => 
      product.gender && product.gender.toLowerCase() === gender.toLowerCase()
    );
    console.log("Fundet produkter:", udsnit.length);
    showProducts(udsnit);
  }
}


let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?limit=80&category=${category}`) 
  .then((response) => response.json())
  .then(data => {showProducts(data);
  allData = data;
  showProducts (allData);
  });


  header.innerHTML= `${category}`;

function showProducts(products){
  productlistContainer.innerHTML="";
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

    // hvis udsolgt -> ingen links
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
