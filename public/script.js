const appendItems = items => {
	items.forEach(item => {
		$('.items-container').append(
      `<article class="item-card">
        <h3>${item.item}</h3>
        <p><strong>Description: </strong>${item.item_description}</p>
        <img src=${item.item_url} alt="bass guitar beauty">
        <p><strong>Price: </strong>$${item.price}.00</p>
        <button data-id=${item.id} class="add-cart-btn">Add To Cart</button>
      </article>`);
	});
};

const getInventory = () => {
	fetch('/api/v1/inventory')
		.then(response => response.json())
		.then(parsedResponse => appendItems(parsedResponse));
};

$('.slide-order-btn').on('click', () => {
  $('.order-history').toggleClass('isActive');
})

$('.slide-cart-btn').on('click', () => {
  $('.cart').toggleClass('isActive');
})

$(document).ready(getInventory);
