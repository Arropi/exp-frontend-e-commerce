$(document).ready(function() {
    $('.add-to-cart').click(function() {
      var productId = $(this).attr('data-product-id');
      var productName = $(this).attr('data-product-name');
      var productPrice = $(this).attr('data-product-price');
      
      var cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
      };
      
      var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      
      var existingItemIndex = -1;
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === productId) {
          existingItemIndex = i;
          break;
        }
      }
      
      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity++;
      } else {
        cartItems.push(cartItem);
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      var cartCount = $('.cart-count');
      var currentCount = parseInt(cartCount.text());
      cartCount.text(currentCount + 1);
      
      alert('Produk berhasil ditambahkan ke keranjang');
    });
  });

  var jumlah = 0;
function tambah() {
    if (jumlah < 1000) {
        jumlah++;
        document.getElementById("jumlah").value = jumlah;
    }
}
function kurang() {
    if (jumlah > 0) {
        jumlah--;
        document.getElementById("jumlah").value = jumlah;
    }
}



  