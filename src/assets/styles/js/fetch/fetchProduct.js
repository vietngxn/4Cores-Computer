document.addEventListener('DOMContentLoaded', function() {
    fetch('../../data/products.json')
      .then(response => response.json())
      .then(products => {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
          const productCard = `
            <div class="product" data-id="${product.id}" data-url="${product.detailUrl}">
              <div class="product-header">
                <img src="${product.image}" alt="${product.title}">
                <p class="title">${product.title}</p>
              </div>
              <div class="product-body">
                <span class="product-body-price1 title1">${product.originalPrice}</span>
                <div class="product-body-title">
                  <span class="title1 product-body-price2">${product.discountedPrice}</span>
                  <span class="product-body-discount title1">${product.discount}</span>
                </div>
              </div>
              <div class="product-footer">
                <div class="row">
                  <div class="col-6">
                    <p class="product-footer-title title1">${product.rating}<img src="${product.ratingIcon}" alt=""></p>
                  </div>
                  <div class="col-6" style="padding-top: 10px;">
                    <span class="product-foter-danhgia title2">(${product.reviews})</span>
                  </div>
                </div>
              </div>
              <button class="end-btn" onclick="themVaoGioHang('${product.id}', '${product.title}', '${product.image}', '${product.discountedPrice}')">
                <span class="title2">Thêm Vào Giỏ Hàng</span>
              </button>
            </div>
          `;
          productList.innerHTML += productCard;
        });
        const productCards = document.querySelectorAll('.product');
        productCards.forEach(card => {
          card.addEventListener('click', function(event) {
            event.preventDefault();
            if (!event.target.closest('.end-btn')) {
              const productUrl = card.dataset.url;
              window.location.href = productUrl;
            }
          });
        });
      })
      .catch(error => console.error('Lỗi khi tải sản phẩm:', error));
  });
  function themVaoGioHang(productId, productTitle, productImage, productPrice) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      showNotiCustom("Lỗi", "Vui lòng đăng nhập để thêm vào giỏ hàng!");
      return;
    }
  
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let userCart = carts.find(cart => cart.userId === currentUser.userId);
  
    if (!userCart) {
      userCart = { userId: currentUser.userId, products: [] };
      carts.push(userCart);
    }
    const existingProduct = userCart.products.find(p => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1; 
    } else {
      userCart.products.push({
        id: productId,
        title: productTitle,
        image: productImage,
        price: productPrice,
        quantity: 1
      });
    }
  
    localStorage.setItem('carts', JSON.stringify(carts));
    showNotiSuccess();
  }