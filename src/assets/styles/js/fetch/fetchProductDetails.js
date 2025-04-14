document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    fetch('../../data/product-details.json')
      .then(response => response.json())
      .then(products => {
        const product = products.find(p => p.id === productId);
        if (!product) {
          document.getElementById('product-detail').innerHTML = '<p>Sản phẩm không tồn tại.</p>';
          return;
        }
        let componentsHtml = `
          <div class="row row-hr">
            <div class="col-11 col-hr scroll-reveal">
              <p class="product-hr-text scroll1">${product.components[0].name}</p>
              <hr class="product-hr">
            </div>
          </div>
          <div class="row">
            <div class="col-7">
              <div class="col col-product-left-text">
                <div class="product-left-text scroll-reveal scroll2">
                  <p>${product.components[0].description}</p>
                </div>
              </div>
            </div>
            <div class="col-5 col-product-right-img">
              <div class="scroll-img-right">
                <img style="${product.components[0].imageStyle}" src="${product.components[0].image}" alt="${product.components[0].name}">
              </div>
            </div>
          </div>
          <div class="row row-hr">
            <div class="col-11 col-hr scroll-reveal">
              <hr class="product-hr">
              <p class="product-hr-text scroll3">${product.components[1].name}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-5 col-product-left-img">
              <div class="scroll-img-left">
                <img style="${product.components[1].imageStyle}" src="${product.components[1].image}" alt="${product.components[1].name}">
              </div>
            </div>
            <div class="col-7">
              <div class="col col-product-right-text">
                <div class="product-right-text scroll-reveal scroll4">
                  <p>${product.components[1].description}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row row-hr">
            <div class="col-11 col-hr scroll-reveal">
              <p class="product-hr-text scroll5">${product.components[2].name}</p>
              <hr class="product-hr">
            </div>
          </div>
          <div class="row">
            <div class="col-7">
              <div class="col col-product-left-text">
                <div class="product-left-text scroll-reveal scroll6">
                  <p>${product.components[2].description}</p>
                </div>
              </div>
            </div>
            <div class="col-5 col-product-right-img">
              <div class="scroll-img-right">
                <img style="${product.components[2].imageStyle}" src="${product.components[2].image}" alt="${product.components[2].name}">
              </div>
            </div>
          </div>
          <div class="row row-hr">
            <div class="col-11 col-hr scroll-reveal">
              <hr class="product-hr">
              <p class="product-hr-text scroll7">${product.components[3].name}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-5 col-product-left-img">
              <div class="scroll-img-left">
                <img style="${product.components[3].imageStyle}" src="${product.components[3].image}" alt="${product.components[3].name}">
              </div>
            </div>
            <div class="col-7">
              <div class="col col-product-right-text">
                <div class="product-right-text scroll-reveal scroll8">
                  <p>${product.components[3].description}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row row-hr">
            <div class="col-11 col-hr scroll-reveal">
              <p class="product-hr-text scroll9">${product.components[4].name}</p>
              <hr class="product-hr">
            </div>
          </div>
          <div class="row">
            <div class="col-7">
              <div class="col col-product-left-text">
                <div class="product-left-text scroll-reveal scroll10">
                  <p>${product.components[4].description}</p>
                </div>
              </div>
            </div>
            <div class="col-5 col-product-right-img">
              <div class="scroll-img-right">
                <img style="${product.components[4].imageStyle}" src="${product.components[4].image}" alt="${product.components[4].name}">
              </div>
            </div>
          </div>
          <div class="row row-hr">
            <div class="col-11 col-hr scroll-reveal">
              <hr class="product-hr">
              <p class="product-hr-text scroll11">${product.components[5].name}</p>
              <hr class="product-hr">
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="full-form-img-PC" style="width: 1103px; height: 920px;">
                <div class="full-form-img full-left"></div>
                <div class="full-form-img full-right"></div>
              </div>
            </div>
          </div>
        `;
        const productHtml = `
          <div class="row row-PC">
            <div class="col-5 justify-content">
              <img src="${product.image}" alt="${product.title}" class="img-PC">
            </div>
            <div class="col-7 product-content-right">
              <div class="row">
                <div class="col">
                  <div class="title-PC">${product.title}</div>
                </div>
              </div>
              <div class="row row-rating">
                <div class="col-3">
                  <span class="img-stars">
                    <span class="img-stars-number">${product.rating}</span>
                    ${'<i class="fa fa-star"></i>'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fa fa-star-half-full"></i>' : ''}
                  </span>
                </div>
                <div class="col-3">
                  <span class="product-rating-evaluate">${product.reviews}</span>
                  <span class="span-gray span-rating">Đánh giá</span>
                </div>
                <div class="col-3">
                  <span class="product-rating-sold">${product.sold}</span>
                  <span class="span-gray span-rating">Đã bán</span>
                </div>
              </div>
              <div class="row-to-margin">
                <div class="row product-row">
                  <div class="col-4">
                    <span class="span-gray line-through">${product.originalPrice}</span>
                  </div>
                </div>
                <div class="row product-row row-price">
                  <div class="col-4 align-items">
                    <span class="product-price">${product.discountedPrice}</span>
                  </div>
                  <div class="col-4 align-items">
                    <span class="product-sale">${product.discount}</span>
                  </div>
                </div>
                <div class="row product-row row-btn">
                  <div class="col-4">
                    <button class="btn-buy"><span></span>MUA NGAY</button>
                  </div>
                  <div class="col-4">
                    <button class="btn-more" onclick="themVaoGioHang('${product.id}', '${product.title}', '${product.image}', '${product.discountedPrice}')">
                      <span></span>THÊM VÀO GIỎ HÀNG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ${componentsHtml}
        `;
        document.getElementById('product-detail').innerHTML = productHtml;
      })
      .catch(error => console.error('Lỗi khi tải chi tiết sản phẩm:', error));
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
  }