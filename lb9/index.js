document.addEventListener('DOMContentLoaded', function() {
    const cities = {
        ukraine: ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Запоріжжя'],
        poland: ['Варшава', 'Краків', 'Вроцлав', 'Познань', 'Гданськ'],
        germany: ['Берлін', 'Мюнхен', 'Гамбург', 'Кельн', 'Франкфурт'],
        usa: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго', 'Маямі', 'Бостон']
    };

    const tabs = document.querySelectorAll('.tab-item');
    const forms = document.querySelectorAll('.form');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tabId}-form`).classList.add('active');
        });
    });

    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type');
            
            if (type === 'password') {
                passwordInput.setAttribute('type', 'text');
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                passwordInput.setAttribute('type', 'password');
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });

    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        
        citySelect.innerHTML = '';
        
        if (!selectedCountry) {
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Спочатку оберіть країну</option>';
            return;
        }
        
        citySelect.disabled = false;
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Оберіть місто';
        citySelect.appendChild(defaultOption);
        
        cities[selectedCountry].forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase();
            option.textContent = city;
            citySelect.appendChild(option);
        });
    });

    const validators = {
        firstName: value => {
            if (!value.trim()) return 'Ім\'я обов\'язкове';
            if (value.length < 3) return 'Ім\'я повинно містити не менше 3 символів';
            if (value.length > 15) return 'Ім\'я повинно містити не більше 15 символів';
            return '';
        },
        
        lastName: value => {
            if (!value.trim()) return 'Прізвище обов\'язкове';
            if (value.length < 3) return 'Прізвище повинно містити не менше 3 символів';
            if (value.length > 15) return 'Прізвище повинно містити не більше 15 символів';
            return '';
        },
        
        email: value => {
            if (!value.trim()) return 'Email обов\'язковий';
            // Регулярний вираз для перевірки email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Введіть коректний email';
            return '';
        },
        
        password: value => {
            if (!value) return 'Пароль обов\'язковий';
            if (value.length < 6) return 'Пароль повинен містити не менше 6 символів';
            return '';
        },
        
        confirmPassword: (value, formData) => {
            if (!value) return 'Підтвердження паролю обов\'язкове';
            if (value !== formData.password) return 'Паролі не співпадають';
            return '';
        },
        
        phone: value => {
            if (!value.trim()) return 'Телефон обов\'язковий';
            const phoneRegex = /^\+380\d{9}$/;
            if (!phoneRegex.test(value)) return 'Введіть коректний номер телефону у форматі +380XXXXXXXXX';
            return '';
        },
        
        birthDate: value => {
            if (!value) return 'Дата народження обов\'язкова';
            
            const birthDate = new Date(value);
            const today = new Date();
            
            if (birthDate > today) return 'Дата народження не може бути в майбутньому';
            
            const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            if (age < 12) return 'Вам повинно бути не менше 12 років для реєстрації';
            
            return '';
        },
        
        sex: value => {
            if (!value) return 'Оберіть стать';
            return '';
        },
        
        country: value => {
            if (!value) return 'Оберіть країну';
            return '';
        },
        
        city: value => {
            if (!value) return 'Оберіть місто';
            return '';
        },
        
        username: value => {
            if (!value.trim()) return 'Логін обов\'язковий';
            return '';
        }
    };

    // Функція для валідації поля та відображення помилки
    function validateField(input, formData = {}) {
        const name = input.name;
        const value = input.type === 'radio' ? (input.checked ? input.value : '') : input.value;
        
        // Якщо це радіокнопка і це не перший елемент з цим ім'ям, пропускаємо
        if (input.type === 'radio' && input !== document.querySelector(`[name="${name}"]`)) {
            return true;
        }
        
        // Отримуємо функцію валідації для поля
        const validator = validators[name];
        if (!validator) return true;
        
        // Отримуємо повідомлення про помилку
        const errorMessage = validator(value, formData);
        
        // Знаходимо блок для відображення помилки
        let errorElement;
        
        if (input.type === 'radio') {
            // Для радіокнопок блок з помилкою знаходиться після всіх варіантів
            const radioGroup = input.closest('.radio-group');
            errorElement = radioGroup.querySelector('.error-message');
        } else {
            // Для інших полів блок з помилкою знаходиться після поля
            errorElement = input.parentElement.querySelector('.error-message') || 
                           input.nextElementSibling;
        }
        
        // Якщо є помилка, відображаємо її та додаємо клас invalid
        if (errorMessage) {
            if (input.type !== 'radio') {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
            errorElement.textContent = errorMessage;
            return false;
        } else {
            // Якщо помилки немає, додаємо клас valid
            if (input.type !== 'radio') {
                input.classList.remove('invalid');
                input.classList.add('valid');
            }
            errorElement.textContent = '';
            return true;
        }
    }

    // Валідація при втраті фокусу для полів форми реєстрації
    const registerForm = document.getElementById('register-form');
    const registerInputs = registerForm.querySelectorAll('input, select');
    
    registerInputs.forEach(input => {
        if (input.type !== 'radio') {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        } else {
            input.addEventListener('change', () => {
                validateField(input);
            });
        }
    });

    // Валідація при втраті фокусу для полів форми авторизації
    const loginForm = document.getElementById('login-form');
    const loginInputs = loginForm.querySelectorAll('input');
    
    loginInputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        }
    });

    // Обробка відправки форми реєстрації
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Збираємо дані форми
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('register-password').value,
            confirmPassword: document.getElementById('confirm-password').value,
            phone: document.getElementById('phone').value,
            birthDate: document.getElementById('birth-date').value,
            sex: document.querySelector('input[name="sex"]:checked')?.value || '',
            country: document.getElementById('country').value,
            city: document.getElementById('city').value
        };
        
        // Валідуємо всі поля
        let isValid = true;
        registerInputs.forEach(input => {
            if (!validateField(input, formData)) {
                isValid = false;
            }
        });
        
        // Якщо всі поля валідні, показуємо повідомлення про успіх
        if (isValid) {
            // Логіка відправки даних на сервер може бути додана тут
            
            // Показуємо модальне вікно з повідомленням про успіх
            const successMessage = document.getElementById('success-message');
            successMessage.classList.add('show');
            
            // Очищаємо форму
            registerForm.reset();
            registerInputs.forEach(input => {
                if (input.type !== 'radio' && input.type !== 'checkbox') {
                    input.classList.remove('valid', 'invalid');
                }
            });
            
            // Деактивуємо поле вибору міста
            document.getElementById('city').disabled = true;
            document.getElementById('city').innerHTML = '<option value="">Спочатку оберіть країну</option>';
        }
    });

    // Обробка відправки форми авторизації
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валідуємо всі поля
        let isValid = true;
        loginInputs.forEach(input => {
            if (input.type !== 'checkbox' && !validateField(input)) {
                isValid = false;
            }
        });
        
        // Якщо всі поля валідні, можна продовжити логіку авторизації
        if (isValid) {
            // Логіка авторизації може бути додана тут
            
            // Очищаємо форму
            loginForm.reset();
            loginInputs.forEach(input => {
                if (input.type !== 'checkbox') {
                    input.classList.remove('valid', 'invalid');
                }
            });
            
            // Показуємо повідомлення про успішну авторизацію
            alert('Авторизація успішна!');
        }
    });

    // Закриття модального вікна з повідомленням про успіх
    document.getElementById('close-success').addEventListener('click', function() {
        document.getElementById('success-message').classList.remove('show');
    });
});