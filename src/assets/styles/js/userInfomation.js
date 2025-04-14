function changeGender(gender) {
    document.querySelector(".information__body__sex-male").classList.remove("selected");
    document.querySelector(".information__body__sex-female").classList.remove("selected");
    document.getElementById(gender).checked = true;
    if (gender === "male") {
        document.querySelector(".information__body__sex-male").classList.add("selected");
    } else {
        document.querySelector(".information__body__sex-female").classList.add("selected");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    document.getElementById('fullName').placeholder = userInfo.fullName || 'Nguyễn Tiến Đạt';
    document.getElementById('address').placeholder = userInfo.address || '129 Đường ta13 phường thới an q12';
    document.getElementById('phone').placeholder = userInfo.phone || '0389269309';
    document.getElementById('email').placeholder = userInfo.email || 'tiendat20051812@gmail.com';
    document.getElementById('birthday').placeholder = userInfo.birthday || 'DD/MM/YYYY';
    if (userInfo.gender) {
        document.getElementById(userInfo.gender).checked = true;
        changeGender(userInfo.gender);
    }
});
document.getElementById('user-info-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value || document.getElementById('fullName').placeholder;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const address = document.getElementById('address').value || document.getElementById('address').placeholder;
    const phone = document.getElementById('phone').value || document.getElementById('phone').placeholder;
    const email = document.getElementById('email').value || document.getElementById('email').placeholder;
    const birthday = document.getElementById('birthday').value || document.getElementById('birthday').placeholder;
    const userInfo = {
        fullName,
        gender,
        address,
        phone,
        email,
        birthday
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    document.getElementById('fullName').placeholder = fullName;
    document.getElementById('address').placeholder = address;
    document.getElementById('phone').placeholder = phone;
    document.getElementById('email').placeholder = email;
    document.getElementById('birthday').placeholder = birthday;
    document.getElementById('user-info-form').reset();
    changeGender(gender); 
});