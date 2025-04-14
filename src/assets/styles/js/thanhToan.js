document.addEventListener('DOMContentLoaded', () => {
    const personalForm = document.querySelector('.personal-info-form');
    const paymentForm = document.querySelector('.payment-form');
    const confirmationForm = document.querySelector('.confirmation-form');
    const paymentBackBtn = paymentForm.querySelector('.to-back p');
    const confirmationBackBtn = confirmationForm.querySelector('.to-back p');
    const personalNextBtn = document.querySelector('#personalNextBtn');
    const paymentNextBtn = document.querySelector('#paymentNextBtn');
    const confirmationNextBtn = document.querySelector('#confirmationNextBtn');
    const radioInputs = document.querySelectorAll('.radio-input-cash');
    const paymentSections = document.querySelectorAll('.choiced');
    const hideAllForms = () => {
        personalForm.classList.add('hide');
        paymentForm.classList.add('hide');
        confirmationForm.classList.add('hide');
    };
    const hideAllPaymentSections = () => {
        paymentSections.forEach(section => {
            section.classList.add('hide');
        });
    };
    const resetImageFilters = () => {
        document.querySelectorAll('.imgchung').forEach(img => {
            img.style.filter = 'grayscale(100%) brightness(100%)';
        });
    };
    const setNextBtnInvalid = (btn) => {
        btn.classList.remove('next-btn');
        btn.classList.add('next-btn-disable');
    };
    const setNextBtnValid = (btn) => {
        btn.classList.remove('next-btn-disable');
        btn.classList.add('next-btn');
    };

    // Kiểm tra form info
    const validatePersonalInputs = () => {
        const name = personalForm.querySelector('input[placeholder="Họ và tên"]').value;
        const phone = personalForm.querySelector('input[placeholder="Số điện thoại"]').value;
        const address = personalForm.querySelector('input[placeholder="Số nhà / tòa nhà"]').value;
        const ward = personalForm.querySelector('#phuongxaInput').value;
        const district = personalForm.querySelector('#quanhuyenInput').value;
        const city = personalForm.querySelector('#tpTinh').value;

        // Kiểm tra: tên chỉ chứa chữ cái và dấu cách, điện thoại 10 chữ số, các trường không rỗng
        const nameRegex = /^[a-zA-Z\s]{2,}$/;
        const phoneRegex = /^\d{10}$/;
        const addressValid = address.trim() !== '';
        const wardValid = ward !== '';
        const districtValid = district !== '';
        const cityValid = city !== '';

        return (
            nameRegex.test(name) &&
            phoneRegex.test(phone) &&
            addressValid &&
            wardValid &&
            districtValid &&
            cityValid
        );
    };

    // validate cho Visa/Mastercard
    const validateCardInputs = (section) => {
        const cardNumber = section.querySelector('input[placeholder="Số thẻ"]').value;
        const expiryMM = section.querySelector('.expiry-date-mm').value;
        const expiryYY = section.querySelector('.expiry-date-yy').value;
        const cvv = section.querySelector('.cvv').value;
        //16 chu so
        const cardNumberRegex = /^\d{16}$/;
        //2 chu so theo tháng
        const mmRegex = /^(0[1-9]|1[0-2])$/;
        //2 chu so theo nam
        const currentYear = new Date().getFullYear() % 100;
        const yyRegex = new RegExp(`^(${currentYear}|${currentYear + 1}|${currentYear + 2}|${currentYear + 3}|${currentYear + 4}|${currentYear + 5})$`);
        //3 chu so
        const cvvRegex = /^\d{3}$/;

        return (
            cardNumberRegex.test(cardNumber) &&
            mmRegex.test(expiryMM) &&
            yyRegex.test(expiryYY) &&
            cvvRegex.test(cvv)
        );
    };

    // validate cho Napas
    const validateNapasInputs = (section) => {
        const bank = section.querySelector('select[name="bank"]').value;
        const accountNumber = section.querySelector('input[placeholder="Số tài khoản"]').value;
        const accountName = section.querySelector('input[placeholder="Họ và tên chủ tài khoản"]').value;
        const branch = section.querySelector('input[placeholder="Chi nhánh"]').value;

        const bankValid = bank !== '';
        //6 chu so trở lên
        const accountNumberRegex = /^\d{6,}$/;
        //2 chu cai tro len
        const accountNameRegex = /^[a-zA-Z\s]{2,}$/;
        //khong duoc de trong
        const branchValid = branch.trim() !== '';

        return (
            bankValid &&
            accountNumberRegex.test(accountNumber) &&
            accountNameRegex.test(accountName) &&
            branchValid
        );
    };
    const validatePaymentForm = (sectionClass) => {
        const section = document.querySelector(`.${sectionClass}`);
        if (!section || section.classList.contains('hide')) {
            setNextBtnInvalid(paymentNextBtn);
            return false;
        }

        let isValid = false;
        if (sectionClass === 'visa-choosen' || sectionClass === 'mastercard-choosen') {
            isValid = validateCardInputs(section);
        } else if (sectionClass === 'napas-choosen') {
            isValid = validateNapasInputs(section);
        } else {
            isValid = true;
        }

        if (isValid) {
            setNextBtnValid(paymentNextBtn);
        } else {
            setNextBtnInvalid(paymentNextBtn);
        }
        return isValid;
    };
    hideAllForms();
    personalForm.classList.remove('hide');
    setNextBtnInvalid(personalNextBtn);

    // quay lai
    paymentBackBtn.addEventListener('click', () => {
        hideAllForms();
        personalForm.classList.remove('hide');
        setNextBtnInvalid(personalNextBtn);
        radioInputs.forEach(input => input.checked = false);
        hideAllPaymentSections();
        resetImageFilters();
    });

    // quay lai
    confirmationBackBtn.addEventListener('click', () => {
        hideAllForms();
        paymentForm.classList.remove('hide');
        const activeSection = document.querySelector('.choiced:not(.hide)');
        const sectionClass = activeSection ? activeSection.classList[0] : '';
        validatePaymentForm(sectionClass);
    });

    personalNextBtn.addEventListener('click', () => {
        if (!validatePersonalInputs()) {
            setNextBtnInvalid(personalNextBtn);
            return;
        }
        setNextBtnValid(personalNextBtn);
        hideAllForms();
        paymentForm.classList.remove('hide');
        setNextBtnInvalid(paymentNextBtn);
    });
    const personalInputs = personalForm.querySelectorAll('input, select');
    personalInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (validatePersonalInputs()) {
                setNextBtnValid(personalNextBtn);
            } else {
                setNextBtnInvalid(personalNextBtn);
            }
        });
    });
    paymentNextBtn.addEventListener('click', () => {
        const activeSection = document.querySelector('.choiced:not(.hide)');
        const sectionClass = activeSection ? activeSection.classList[0] : '';
        if (!validatePaymentForm(sectionClass)) {
            return;
        }
        hideAllForms();
        confirmationForm.classList.remove('hide');
        setNextBtnValid(confirmationNextBtn);
    });
    confirmationNextBtn.addEventListener('click', () => {
        showSuccessNotification();
        hideAllForms();
        personalForm.classList.remove('hide');
        setNextBtnInvalid(personalNextBtn);
        radioInputs.forEach(input => input.checked = false);
        hideAllPaymentSections();
        resetImageFilters();
    });
    radioInputs.forEach(input => {
        input.addEventListener('change', () => {
            hideAllPaymentSections();
            resetImageFilters();
            if (input.checked) {
                let sectionClass;
                switch (input.value) {
                    case 'visa':
                        sectionClass = 'visa-choosen';
                        break;
                    case 'mastercard':
                        sectionClass = 'mastercard-choosen';
                        break;
                    case 'napas':
                        sectionClass = 'napas-choosen';
                        break;
                    case 'momo':
                        sectionClass = 'momo-choosen';
                        break;
                    case 'zlpay':
                        sectionClass = 'zalo-choosen';
                        break;
                    case 'tm':
                        sectionClass = 'tienmat';
                        break;
                    default:
                        return;
                }
                const selectedSection = document.querySelector(`.${sectionClass}`);
                if (selectedSection) {
                    selectedSection.classList.remove('hide');
                }
                const label = input.nextElementSibling;
                const img = label.querySelector('.imgchung');
                if (img) {
                    img.style.filter = 'none';
                }
                validatePaymentForm(sectionClass);
            }
        });
    });
    const inputSections = document.querySelectorAll('.visa-choosen, .mastercard-choosen, .napas-choosen');
    inputSections.forEach(section => {
        const inputs = section.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validatePaymentForm(section.classList.contains('visa-choosen') ? 'visa-choosen' :
                                   section.classList.contains('mastercard-choosen') ? 'mastercard-choosen' :
                                   'napas-choosen');
            });
        });
    });
});


    function showSuccessNotification() {
        const addblur = document.querySelector('.toAddBlur');
        const toAddBlur = document.getElementById("giohang")
        const successNoti = document.querySelector('.success-noti');
        addblur.classList.add('blur-background');
        toAddBlur.classList.add('blur-background');
        successNoti.classList.remove('hide');
        setTimeout(() => {
            successNoti.classList.add('hide');
            toAddBlur.classList.remove('blur-background');
            addblur.classList.remove('blur-background');
        }, 4000); 
    }