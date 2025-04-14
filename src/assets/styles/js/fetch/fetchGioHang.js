document.addEventListener('DOMContentLoaded', function() {
    hienThiGioHang();
    document.querySelector('.list_sanpham_body').addEventListener('click', function(event) {
      const target = event.target.closest('svg');
      if (!target) return;
  
      const row = target.closest('tr');
      const productId = row.dataset.productId;
  
      if (target.classList.contains('cong-btn')) {
        capNhatSoLuong(productId, 1);
      } else if (target.classList.contains('tru-btn')) {
        capNhatSoLuong(productId, -1);
      } else if (target.classList.contains('xoa-btn')) {
        xoaSanPham(productId);
      }
    });
  });
  function hienThiGioHang() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const tbody = document.querySelector('.list_sanpham_body');
    const tongTienElement = document.getElementById('tongtien_sanpham');
  
    if (!currentUser) {
      tbody.innerHTML = '<tr><td colspan="5">Vui lòng đăng nhập để xem giỏ hàng.</td></tr>';
      tongTienElement.textContent = 'Tổng tiền: 0đ';
      return;
    }
  
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let userCart = carts.find(cart => cart.userId === currentUser.userId);
  
    if (!userCart || userCart.products.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Giỏ hàng trống.</td></tr>';
      tongTienElement.textContent = 'Tổng tiền: 0đ';
      return;
    }
  
    let tongTien = 0;
    tbody.innerHTML = userCart.products.map(product => {
      const thanhTien = parseFloat(product.price.replace(/[^0-9]/g, '')) * product.quantity;
      tongTien += thanhTien;
  
      return `
        <tr data-product-id="${product.id}">
          <td class="thongtin_sanpham">
            <img src="${product.image}" alt="${product.title}" class="img_sanpham">
            <div>
              <p class="ten_sanpham">${product.title}</p>
              <small class="madh">Mã đơn hàng: ${generateMaDonHang()}</small>
            </div>
            <p class="soluong_sanpham">${product.quantity}</p>
            <div class="cong_tru_btn">
              <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="cong-btn">
                <circle cx="11.5" cy="11.5" r="11.5" fill="#B02B19" />
                <path d="M10.4427 15.3V12.62H7.64273V10.52H10.4427V7.78H12.5627V10.52H15.3627V12.62H12.5627V15.3H10.4427Z" fill="white" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="tru-btn">
                <circle cx="12" cy="12" r="12" fill="#B02B19" />
                <path d="M8.14039 11.62V9.52H15.8604V11.62H8.14039Z" fill="white" />
              </svg>
            </div>
            <p class="gia_sanpham">${product.price}</p>
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                      <rect width="30" height="30" fill="url(#pattern0_254_2227)" />
                                      <defs>
                                          <pattern id="pattern0_254_2227" patternContentUnits="objectBoundingBox"
                                              width="1" height="1">
                                              <use xlink:href="#image0_254_2227" transform="scale(0.00166667)" />
                                          </pattern>
                                          <image id="image0_254_2227" width="600" height="600" preserveAspectRatio="none"
                                              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAYAAAC+ZpjcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAUmklEQVR4nO3YMY5j1xFAUUYGtUZpHw7t0PtxIGh1YwwwCg3Jhpr/VtU5QOfk/+9V3ebrBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHzIz6/X6+1pA/Ah7x+7B9b65+v1+vZ6vX57vV4/Pf1hAFjvb6/X698/ds+/nv4w8JVx9fufyALgU3H1+5/IYnVciSwAPh1XIosTcSWyAPh0XIksTsSVyALg03ElsjgRVyILgE/HlcjiRFyJLAA+HVciixNxJbIA+HRciSxOxJXIAuDTcSWyOBFXIguAT8eVyOJEXIksAD4dVyKLE3ElsgD4dFyJLE7ElcgC4NNxJbI4EVciC4BPx5XI4kRciSyA256IK5HFibgSWQA3PRlXIouP+OXhA/7736+v1+vtnQOs9/4x878F/r7vQFj7X4RfsgBuqO0c/9hz6sD/5H0DrFPbNeKKkwdfZAHsUdsx4orTF0BkAcxX2y3iikfULoLIApirtlPEFY+qXQiRBTBPbZeIKxJqF0NkAcxR2yHiipTaBRFZAH213SGuSKpdFJEF0FXbGeKKtNqFEVkAPbVdIa4YoXZxRBZAR21HiCtGqV0gkQXwvNpuEFeMVLtIIgvAThBXrCCyAKjtAr9csULtYvklC+DuDhBXrFK7YCIL4N7sF1esVLtoIgvgzswXV6xWu3AiC2D/rBdXnFC7eCILYO+MF1ecUruAIgtg32wXV5xUu4giC2DPTBdXnFa7kCILYP4sF1cQvJgiC2DuDBdXEL6gIgtg3uwWVzDgooosgDkzW1zBoAsrsgD6s1pcwcCLK7IAujNaXMHgCyyyAHqzWVzBgosssoDLajNZXMGiCy2ygItqs1hcwcKLLbKAS2ozWFzB4gsusoALarNXXMGBiy6ygM1qM1dcwaELL7KAjWqzVlzBwYsvsoBNajNWXMHhASCygA1qs1VcwQNqg0BkAZPVZqq4ggfVBoLIAiaqzVJxBQG1wSCygElqM1RcQUhtQIgsYILa7BRXEFQbFCILKKvNTHEFYbWBIbKAotqsFFcwQG1wiCygpDYjxRUMUhsgIgsoqM1GcQUD1QaJyALMRHEFK4gsgN4s9MsVLFAbLH7JAi7PQHEFi9QGjMgCLs4+cQUL1QaNyAIuzTxxBYvVBo7IAi7MOnEFB9QGj8gCNs84cQWH1AaQyAI2zjZxBQfVBpHIAjbNNHEFh9UGksgCNswycQXkBpPIAibPMHEFZAeUyAImzi5xBeQHlcgCJs0scQWMGVgiC5gwq8QVMG5wiSygPKPEFTB2gIksoDibxBUwfpCJLLitNpPEFbBmoIksuKk2i8QVsG6wiSy4pTaDxBWwdsCJLLihNnvEFbB+0Iks2K02c8QVcGbgiSzYqTZrxBVwbvCJLNilNmPEFXB2AIos2KE2W8QV8Lo+CEUWzFabKeIKeExtIIosmKk2S8QV8LjaYBRZMEtthogrIKM2IEUWzFCbHeIKyKkNSpEFbbWZIa6ArNrAFFnQVJsV4grIqw1OkQUttRkhroAxagNUZEFDbTaIK2Cc2iAVWWAmiCtgBZEFFGeBX66A8WqD1S9ZcHsGiCtgjdqAFVlw8+6LK2Cd2qAVWXDrzosrYK3awBVZcOOuiytgvdrgFVmw+46LK+CM2gAWWbDzbosr4JzaIBZZsOtOiyvgrNpAFlmw4y6LK+C82mAWWTD7DosrgOiAFlkw8+6KK4D4oBZZMOvOiiuAIQNbZMGMuyquAIYNbpEF7TsqrgCGDnCRBc27Ka4Ahg9ykcV1tTsprgCWDHSRxVW1uyiuAJYNdpHFNbU7KK4Alg54kcUVtbsnrgCWD3qRxXa1OyeuAI4MfJHFVrW7Jq4Ajg1+kcU2tTsmrgCOLgCRxRa1uyWuAI4vApHFdLU7Ja4AHlJbCCKLqWp3SVwBPKy2GEQW09TukLgCiKgtCJHFFLW7I64AYmqLQmRRV7sz4gogqrYwRBZVtbsirgDiaotDZFFTuyPiCmCI2gIRWVTU7oa4AhimtkhEFk+r3QlxBTBUbaGILNwFcQWwgsjiutod8MsVwBK1BeOXLK6efXEFsExt0Ygsrp15cQWwVG3hiCyunHVxBbBcbfGILLafcXEFcERtAYkstp5tcQVwTG0RiSy2nWlxBXBUbSGJLLacZXEFcFxtMYkspp9hcQVAckGJLKaeXXEFQHpRiSymnVlxBcCIhSWymHJWxRUAoxaXyKJ+RsUVACMXmMiiejbFFQCjF5nIonYmxRUAKxaayLqrdhbFFQCrFpvIuqd2BsUVACsXnMi6o3b2xBUAqxedyNqvdubEFQAnFp7I2qt21sQVAKcWn8jap3bGxBUAJxegyNqjdrbEFQCnF6HImq92psQVAI+oLUSRNVftLIkrAB5VW4wia57aGRJXACTUFqTImqN2dsQVACm1RSmy+mpnRlwBkFRbmCKrq3ZWxBUAabXFKbJ6amdEXAEwQm2BiqyO2tkQVwCMUlukIut5tTMhrgAYqbZQRZazIK4AWEFkUTsDfrkCYIXagvVL1t13L64AWKW2aEXWvXcurgBYqbZwRdaddy2uAFittnhF1v53LK4AOKG2gEXW3ncrrgA4pbaIRda+dyquADiptpBF1p53Ka4AOK22mEXW/HcorgAguKBF1tx3J64AILyoRdYfq70zcQUAAxa2yJrzrsQVAAxa3CKr/47EFQAMXOAiq/tuxBUADF7kIqv3TsQVACxY6Jcjq/YuxBUALFrsFyOr9g7EFQAsXPCXIqv27MUVACxe9Bciq/bMxRUAHFj4myOr9qzFFQAcWvwbI6v2jMUVABwMgE2RVXu24goADofAhsiqPVNxBQAPqAXB5MiqPUtxBQAPqoXBxMiqPUNxBQABtUCYFFm1ZyeuACCkFgoTIqv2zMQVAATVgqEcWbVnJa4AIKwWDsXIqj0jcQUAA9QCohRZtWcjrgBgkFpIFCKr9kzEFQAMVAuKJyOr9izEFQAMVguLJyKr9gzEFQAscDmyat9dXAHAIhcjq/adxRUALHQpsmrfVVwBwGIXIqv2HcUVABywObJq301cAcAhGyOr9p3EFQActCmyat9FXAHAYRsiq/YdxBUAMDqyap9dXAEAoyOr9pnFFQAwOrJqn1VcAQCjI6v2GcUVAPCHypFV+2ziCgD404qRVftM4goA+J99D4hfAzHz7cfnKH0WcQUA/N9KvxoV/vxyBQD8JUSWuAIAvsD1yPLLFQDwJa5GlrgCAL7UtcgSVwDAR1yJLHEFAHzU9sgSVwDAI7ZGlrgCAB61LbLEFQCQsCWyxBUAkDI9ssQVAJA0NbLEFQCQNi2yxBUAMMKUyBJXAMAo9cgSVwDASNXIElcAwGi1yBJXAMB4xcD66emHAgCwJa5EFgAwWjWuRBYAMFI9rkQWADDKlLgSWQDACNPiSmQBAGlT40pkAQBJ0+NKZAEAKVviSmQBAAnb4kpkAQCP2hpXIgsAeMT2uBJZAMBHXYkrkQUAfMS1uBJZAMCXuhpXIgsA+BLX40pkAQB/KXElsgCAv9D79Xr9Gvjl6NuPz1H6LN+fDQDA2F+ufvsRNLXP9JMzBQD8WbWQeYc/m8gCAP5QLWDeAz6jyAIA/qtauLwHfVaRBQDkg+U98DOLLAAgGyrvwZ9dZAEAuUB5L/gOIgsADquFyXvRdxFZAHBQLUjeC7+TyAKAQ2oh8l783UQWABxQC5D3ge8osgBgsVp4vA99V5EFAAvVguN98DuLLABY5GJcVb+7yAKABS7HVfUZiCwAGKwWFk/EVfVZiCwAGKgWFE/GVfWZiCwAGKQWEoW4qj4bkQUAA9QCohRX1WcksgAgrBYOxbiqPiuRBQBBtWAox1X1mYksAAiphcKEuKo+O5EFAAG1QJgUV9VnKLIA4EG1MJgYV9VnKbIA4AG1IJgcV9VnKrIA4HAIbIir6rMVWQBwMAA2xVX1GYssADi0+DfGVfVZiywAOLDwN8dV9ZmLLABYvOgvxFX12YssAFi44C/FVfUdiCwAWLTYL8ZV9V2ILABYsNAvx1X1nYgsABi8yMVV992ILAAYuMDFVf8diSwAGLS4xdWcdyWyAGDAwhZX896ZyAKA8KIWV3PfncgCgOCCFlfz36HIAuC02mIWV3vepcgC4KTaQhZX+96pyALglNoiFld7363IAuCE2gIWV/vfscgCYLXa4hVXd961yAJgpdrCFVf33rnIAmCV2qIVV3ffvcgCYIXaghVXzoDIAmA0cUX1LIgsAEaqLVS/XD2vdiZEFgCj1BapuOqonQ2RBcAItQUqrnpqZ0RkAZBWW5ziqqt2VkQWAEm1hSmu+mpnRmQBkFJblOJqjtrZEVkAJNQWpLiap3aGRBYAj6otRnE1V+0siSwAHlFbiOJqvtqZElkAnF6E4mqP2tkSWQCcXIDiap/aGRNZAJxafOJqr9pZE1kAnFh44mq/2pkTWQCsXnTi6o7a2RNZAKxccOLqntoZFFkArFps4uqu2lkUWQCsWGjiitqZFFkAjF5k4orq2RRZAIxcYOKK+hkVWQCMWlziiilnVWQBMGJhiSumnVmRBUB6UYkrpp5dkQVAckGJK6afYZEFcFxtMYkrtpxlkQVwVG0hiSu2nWmRBXBMbRGJK7aebZEFcERtAYkrtp9xkQWwXG3xiCuunHWRBbBUbeGIK66deZEFsExt0Ygrrp59kQWwRG3BiCuu3wGRBTBcbbGIK9wFkQUwmriC9p3wSxbAMLVF4pcrKmp3Q2QBDFFbIOKKmtodEVkAcbXFIa6oqt0VkQUQVVsY4oq62p0RWQAxtUUhrpiidndEFkBEbUGIK6ap3SGRBfCw2mIQV0xVu0siC+AhtYUgrpiudqdEFsDxRSCu2KJ2t0QWwNEFIK7YpnbHRBbAscEvrtiqdtdEFsCRgS+u2K5250QWwPJBL664onb3RBbA0gEvrrimdgdFFsCywS6uuKp2F0UWwJKBLq64rnYnRRbA8EEurqB5N0UWwNABLq6gfUdFFsCwwS2uYMZdFVkAQwa2uIJZd1ZkAcQHtbiCmXdXZAFEB7S4gtl3WGQB59UGs7iCHXdZZAFn1QayuIJdd1pkAefUBrG4gp13W2QBZ9QGsLiC3XdcZAHr1QavuIIbd11kAWvVBq64glt3XmQB69QGrbiCm3dfZAFr1AasuILbM0BkAePVBqu4ArNAZAGjiSugPBP8kgWMUxukfrmChtpsEFnAGLUBKq6gpTYjRBaQVxuc4gqaarNCZAFZtYEprqCtNjNEFpBTG5TiCmaozQ6RBWTUBqS4gllqM0RkAY+rDUZxBTPVZonIAh5TG4jiCmarzRSRBbyuD0JxBTvUZovIAs4OQHEFu9RmjMgCzg0+cQU71WaNyALODDxxBbvVZo7IAtYPOnEFN9Rmj8gC1g44cQW31GaQyALWDTZxBTfVZpHIAtYMNHEFt9VmksgCxg8ycQUUZ5PIAsYOMHEFlGeUyALGDS5xBUyYVSILGDOwxBUwaWaJLCA/qMQVMHF2iSwgO6DEFTB5hoksIDeYxBWwYZaJLDisNpDEFbBppoksOKg2iMQVsHG2iSw4pDaAxBWwecaJLDigNnjEFXBh1oksWKw2cMQVcGnmiSxYqDZoxBVwcfaJLFikNmDEFXB5BoosWKA2WMQVYBaKLBhNXAF0Z6JfsmCg2iDxyxVQUJuNIgsGqQ0QcQWU1GakyIIBaoNDXAFFtVkpsiCsNjDEFVBWm5kiC4Jqg0JcARPUZqfIgpDagBBXwCS1GSqyIKA2GMQVMFFtlooseFBtIIgrYLLaTBVZ8IDaIBBXwAa12Sqy4PAAEFfAJrUZK7Lg4MUXV8BGtVkrsuDQhRdXwGa1mSuy4MBFF1fABbXZK7Jg8QUXV8AltRkssmDhxRZXwEW1WSyyYNGFFlfAZbWZLLJgwUUWVwC92SyyYPAFFlcA3RktsmDgxRVXAP1ZLbJg0IUVVwBzZrbIggEXVVwBzJvdIgvCF1RcAcyd4SILghdTXAHMn+Uii9NqF1JcAeyZ6SKLk2oXUVwB7JvtIotTahdQXAHsnfEiixNqF09cAeyf9SKL1WoXTlwB3Jn5IouVahdNXAHcm/0ii1VqF0xcAdzdASKLFWoXS1wB2AUii9HEFQDVnSCyGKl2kfxyBfC82m4QWYxSu0DiCqCjtiNEFiPULo64Auip7QqRRVrtwogrgK7azhBZJNUuirgC6KvtDpFFSu2CiCuAOWo7RGSRULsY4gpgntouEVk8qnYhxBXAXLWdIrJ4RO0iiCuA+Wq7RWRx+gKIK4A9ajtGZHHy4IsrgH1qu0ZkcerAiyuAvWo7R2TxZX4JHPLvf7+KK4AT3j9m/rfA3/cdCF/m74H/IvxyBXBH4Zesfzz9ELjhqcgSVwA3PRlZ4orVkSWuAG57IrLEFasjS1wB8OnIElesjixxBcCnI0tcsTqyxBUAn44sccXqyBJXAHw6ssQVqyNLXAHw6cgSV6yOLHEFwKcjS1yxOrLEFQCfjixxxerIElcAfDqyxBWrI0tcAfDpyBJXrI4scQXApyNLXLE6ssQVAJ+OLHHF6sgSVwB8OrLEFasjS1wB8OnIEles9vPr9Xo//SEAOOP9Y/cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAry/3HxkJpIdzxbFdAAAAAElFTkSuQmCC" />
                                      </defs>
                                  </svg>
          </td>
        </tr>
      `;
    }).join('');
  
    tongTienElement.textContent = `Tổng tiền: ${tongTien.toLocaleString('vi-VN')}đ`;
  }
  
  function capNhatSoLuong(productId, delta) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
  
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let userCart = carts.find(cart => cart.userId === currentUser.userId);
  
    if (userCart) {
      const product = userCart.products.find(p => p.id === productId);
      if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
          userCart.products = userCart.products.filter(p => p.id !== productId);
        }
        localStorage.setItem('carts', JSON.stringify(carts));
        hienThiGioHang();
      }
    }
  }
  
  function xoaSanPham(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
  
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let userCart = carts.find(cart => cart.userId === currentUser.userId);
  
    if (userCart) {
      userCart.products = userCart.products.filter(p => p.id !== productId);
      localStorage.setItem('carts', JSON.stringify(carts));
      hienThiGioHang();
    }
  }
  
  function generateMaDonHang() {
    return 'HE' + Math.floor(Math.random() * 100000).toString().padStart(5, '0') + 'KL';
  }