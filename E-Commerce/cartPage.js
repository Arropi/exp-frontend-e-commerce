$(document).ready(function () {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    var cartItemsTable = $('.cart-items');
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];

        var row = $('<tr></tr>');

        var nameCell = $('<td></td>');
        nameCell.text(cartItem.name);
        row.append(nameCell);

        var priceCell = $('<td></td>');
        priceCell.text(cartItem.price);
        row.append(priceCell);


        var quantityCell = $('<td></td>');
        var quantity = cartItem.quantity;

        var addButton = $('<button class="btn btn-sm btn-outline-secondary"><i class="fas fa-plus"></i></button>');
        addButton.click((function (quantityCell, cartItem, row, cartItems) {
            return function () {
                var quantity = cartItem.quantity;
                quantity++;
                quantityCell.find('span').text(quantity)
                cartItem.quantity = quantity;
                updateTotal(row, cartItems);
            };
        })(quantityCell, cartItem, row, cartItems));


        var minusButton = $('<button class="btn btn-sm btn-outline-secondary"><i class="fas fa-minus"></i></button>');
        minusButton.click((function (quantityCell, cartItem, row, cartItems) {
            return function () {
                var quantity = cartItem.quantity;
                if (quantity > 1) {
                    quantity--;
                    quantityCell.find('span').text(quantity)
                    cartItem.quantity = quantity;
                    updateTotal(row, cartItems);
                }
            }
        })(quantityCell, cartItem, row, cartItems));

        quantityCell.append(addButton);
        quantityCell.append($('<span class="m-1"></span>').text(quantity));
        quantityCell.append(minusButton);
        row.append(quantityCell);


        var totalCell = $('<td></td>');
        var total = cartItem.price * cartItem.quantity;
        totalCell.text(total);
        row.append(totalCell);

        var removeCell = $('<td></td>');
        var removeButton = $('<button><i class="fas fa-trash"></i></button>');
        removeButton.click(function () {
            var itemId = $(this).attr('data-item-id');

            var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            var remainingItems = [];
            for (var j = 0; j < cartItems.length; j++) {
                if (cartItems[j].id !== itemId) {
                    remainingItems.push(cartItems[j]);
                }
            }

            localStorage.setItem('cartItems', JSON.stringify(remainingItems));

            $(this).parents('tr').remove();

            var total = parseInt($(this).parents('tr').find('td:nth-child(4)').text());
            var cartTotal = $('.cart-total');
            var currentTotal = parseInt(cartTotal.text().replace('Rp. ', ''));
            cartTotal.text('Rp. ' + (currentTotal - total));

            var cartCount = $('.cart-count');
            var currentCount = parseInt(cartCount.text());
            cartCount.text(currentCount - 1);

            alert('Produk berhasil dihapus dari keranjang');
        });
        removeButton.attr('data-item-id', cartItem.id);
        removeCell.append(removeButton);
        row.append(removeCell);
        
        function updateTotal(row, cartItems) {
            var price = parseInt(row.find('td:eq(1)').text());
            var quantity = parseInt(row.find('td:eq(2)').find('span').text());
            var total = price * quantity;
            row.find('td:eq(3)').text(total);

            var total = 0;
            for (var i = 0; i < cartItems.length; i++) {
                var cartItem = cartItems[i];
                total += cartItem.price * cartItem.quantity;
            }
            cartTotal.text('Rp. ' + total);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
        cartItemsTable.append(row);
    }
    var cartCount = $('.cart-count');
    cartCount.text(cartItems.length);

    var cartTotal = $('.cart-total');
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        total += cartItem.price * cartItem.quantity;
    }

    cartTotal.text('Rp. ' + total);
});
