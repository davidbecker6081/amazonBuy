const appendItems = items => {
	items.forEach(item => {
		$('.items-container').append(
      `<article class="item-card">
        <h3>${item.item}</h3>
        <p><strong>Description: </strong>${item.item_description}</p>
        <img src=${item.item_url} alt="bass guitar beauty">
        <p><strong>Price: </strong>$${item.price}.00</p>
        <button data-name='${item.item}' data-price=${item.price} class="add-cart-btn">Add To Cart</button>
      </article>`);
	});
};

const getInventory = () => {
	fetch('/api/v1/inventory')
		.then(response => response.json())
		.then(parsedResponse => appendItems(parsedResponse));
};

const appendToCart = (name, price) => {
  $('.cart-article-container').append(
    `<article class="cart-article">
      <h4>${name}</h4>
      <p data-price=${price} class="cart-item-price">Price: $${price}.00</p>
    </article>`)
}

const updateTotalCartPrice = () => {
  let total = 0;
  $('.cart-item-price').each((i, price) => {
    total += $(price).data('price')
  })
  console.log(total);
  $('.cart-total').text(total)
}

$('.items-container').on('click', '.add-cart-btn', (e) => {
  const name = $(e.target).data('name');
  const price = $(e.target).data('price')
  appendToCart(name, price)
  updateTotalCartPrice()
})

$('.slide-order-btn').on('click', () => {
  $('.order-history').toggleClass('isActive');
})

$('.slide-cart-btn').on('click', () => {
  $('.cart').toggleClass('isActive');
})

$(document).ready(getInventory);
