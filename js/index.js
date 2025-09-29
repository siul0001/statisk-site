const category_list_container = document.querySelector(".category_list_container");

fetch(`https://kea-alt-del.dk/t7/api/categories`)

.then(response => response.json())
.then((categories) => showcategories(categories));

function showcategories(categories){
categories.forEach (category => {
    category_list_container.innerHTML +=  `<a href="produktliste.html?category=${category.category}">${category.category}</a>`;

});
}

  