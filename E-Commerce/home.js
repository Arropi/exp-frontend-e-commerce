$(document).ready(function() {
  $(document).ready(function() {
    // Saat checkbox diberi tanda centang
    $("#diskonCheckbox").on("change", function() {
      if ($(this).is(":checked")) {
        // Sembunyikan semua elemen yang tidak memiliki diskon
        $(".filter").not(":contains('20%')").hide();
      } else {
        // Tampilkan kembali semua elemen
        $(".filter").show();
      }
    });
  });

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

// dapatkan semua tombol kategori
const kategoriButtons = document.querySelectorAll('.btn-kategori');

kategoriButtons.forEach(button => {
  button.addEventListener('click', () => {
    const kategori = button.getAttribute('data-kategori');
    const kartu = document.querySelectorAll('.card');
    let kartuTampil = [];

    // ambil kartu yang memiliki kategori yang sama
    kartu.forEach(kartu => {
      if (kartu.getAttribute('data-kategori') === kategori) {
        kartuTampil.push(kartu);
      }
    });

    // sort kartu berdasarkan posisi kiri
    kartuTampil.sort((a, b) => a.offsetLeft - b.offsetLeft);

    // tampilkan kartu secara berurutan
    kartuTampil.forEach((kartu, index) => {
      kartu.style.order = index;
      kartu.style.display = 'block';
    });

    // sembunyikan kartu yang tidak memiliki kategori yang sama
    kartu.forEach(kartu => {
      if (kartu.getAttribute('data-kategori') !== kategori) {
        kartu.style.display = 'none';
      }
    });
  });
});
