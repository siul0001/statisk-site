const productContainer =document.querySelector("#productcontainer")

fetch("https://kea-alt-del.dk/t7/api/products/1163 s") 
  .then(res => res.json())
  .then(product => {
    console.log(product.articletype);
    productContainer.innerHTML = `
      <section class="product-information">
        <div>
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"/>
        </div>
        <div class="info">
          <h3>${product.productdisplayname}</h3>
          <p>${product.basecolour}</p>
          <div class="product-price">
            <span class="old-price">Prev. DKK 1500,-</span>
            Now DKK ${product.price},-
          </div>
          <p>This product is excluded from all discounts, offers and promotions.</p>
          <div class="size">
            <p>36</p>
            <p>37</p>
            <p>38</p>
            <p>39</p>
          </div>
          <a href="index.html" class="buy-btn">ADD TO CART</a>
        </div>
      </section>`;
  });
