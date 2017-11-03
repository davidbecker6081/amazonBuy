const addToLocalStorage = item => {
	const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

	cartItems.push(item);
	localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const appendItems = items => {
	items.forEach(item => {
		$('.items-container').append(
			`<article class="item-card">
        <h3>${item.item}</h3>
        <p><strong>Description: </strong>${item.item_description}</p>
        <img src=${item.item_url} alt="bass guitar beauty">
        <p><strong>Price: </strong>$${item.price}.00</p>
        <button data-name='${item.item}' data-price=${item.price} class="add-cart-btn">Add To Cart</button>
      </article>`,
		);
	});
};

const appendOrder = order => {
	const orderNumber = $('.order-article').length + 1;

	$('.order-article-container').append(
		`<article class="order-article">
        <h4>Order #${orderNumber}</h4>
        <p>Order Date: ${order.created_at.slice(0, 10)}</p>
        <p>Total Price: $${order.total}.00</p>
      </article>`,
	);
};

const appendToCart = (name, price) => {
	$('.cart-article-container').append(
		`<article class="cart-article">
      <h4>${name}</h4>
      <p data-price=${price} class="cart-item-price">Price: $${price}.00</p>
    </article>`,
	);
};

const fetchLocalStorage = () => {
	const itemsFromStorage = JSON.parse(localStorage.getItem('cartItems'));

	if (itemsFromStorage) {
		itemsFromStorage.forEach(item => {
			appendToCart(item.name, item.price);
			updateTotalCartPrice();
		});
	}
};

const fetchOrders = () => {
	fetch('/api/v1/order_history')
		.then(response => response.json())
		.then(parsedResponse => {
			parsedResponse.forEach(order => {
				appendOrder(order);
			});
		});
};

const getInventory = () => {
	fetch('/api/v1/inventory')
		.then(response => response.json())
		.then(parsedResponse => appendItems(parsedResponse));
};

const postOrder = () => {
	const total = { total: $('.cart-total').text() };

	fetch('/api/v1/order_history', {
		method: 'POST',
		body: JSON.stringify(total),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(response => response.json())
		.then(parsedResponse => appendOrder(parsedResponse[0]));
};

const showOrder = () => {
  $('.cart').removeClass('isActive');
  $('.slide-cart-btn').text('+');
  $('.order-history').addClass('isActive');
  $('.slide-order-btn').text('-')
}

const toggleCheckoutBtn = () => {
	const isCartFull = $('.cart-article').length;
	const checkoutBtn = $('.checkout-btn');

	isCartFull
		? checkoutBtn.attr('disabled', false)
		: checkoutBtn.attr('disabled', true);
};

const updateTotalCartPrice = () => {
	let total = 0;

	$('.cart-item-price').each((i, price) => {
		total += $(price).data('price');
	});
	$('.cart-total').text(total);
};

$('.checkout-btn').on('click', () => {
  postOrder()
  $('.cart-article-container').empty();
  updateTotalCartPrice();
  showOrder()
});

$('.items-container').on('click', '.add-cart-btn', e => {
	const name = $(e.target).data('name');
	const price = $(e.target).data('price');
	const item = {
		name,
		price,
	};

	appendToCart(name, price);
	updateTotalCartPrice();
	addToLocalStorage(item);
	toggleCheckoutBtn();
});

$('.slide-cart-btn').on('click', e => {
  const isActive = $('.cart').hasClass('isActive');

  $('.cart').toggleClass('isActive');
  isActive ? $(e.target).text('+') : $(e.target).text('-');
});

$('.slide-order-btn').on('click', e => {
	const isActive = $('.order-history').hasClass('isActive');

	$('.order-history').toggleClass('isActive');
	isActive ? $(e.target).text('+') : $(e.target).text('-');
});

$(document).ready(getInventory);

$(window).on('load', () => {
	fetchLocalStorage();
  fetchOrders();
	toggleCheckoutBtn();
});
