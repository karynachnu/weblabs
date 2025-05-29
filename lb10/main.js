
const BASE_URL = 'https://randomuser.me/api/';

async function fetchUsers(count = 30) {
  const url = `${BASE_URL}?results=${count}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Помилка завантаження');
  const data = await res.json();
  return data.results;
}

function initAuth(onSuccess) {

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

    function validateField(input, formData = {}) {
        const name = input.name;
        const value = input.type === 'radio' ? (input.checked ? input.value : '') : input.value;
        
        if (input.type === 'radio' && input !== document.querySelector(`[name="${name}"]`)) {
            return true;
        }
        
        const validator = validators[name];
        if (!validator) return true;
        
        const errorMessage = validator(value, formData);
        
        let errorElement;
        
        if (input.type === 'radio') {
            const radioGroup = input.closest('.radio-group');
            errorElement = radioGroup.querySelector('.error-message');
        } else {
            errorElement = input.parentElement.querySelector('.error-message') || 
                           input.nextElementSibling;
        }
        
        if (errorMessage) {
            if (input.type !== 'radio') {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
            errorElement.textContent = errorMessage;
            return false;
        } else {
            if (input.type !== 'radio') {
                input.classList.remove('invalid');
                input.classList.add('valid');
            }
            errorElement.textContent = '';
            return true;
        }
    }

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

    const loginForm = document.getElementById('login-form');
    const loginInputs = loginForm.querySelectorAll('input');
    
    loginInputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        }
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
        
        let isValid = true;
        registerInputs.forEach(input => {
            if (!validateField(input, formData)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            const data = Object.fromEntries(new FormData(registerForm));
            console.log(data)
            localStorage.setItem("user", JSON.stringify(data));
            onSuccess();
            const successMessage = document.getElementById('success-message');
            successMessage.classList.add('show');
            
            registerForm.reset();
            registerInputs.forEach(input => {
                if (input.type !== 'radio' && input.type !== 'checkbox') {
                    input.classList.remove('valid', 'invalid');
                }
            });
            
            document.getElementById('city').disabled = true;
            document.getElementById('city').innerHTML = '<option value="">Спочатку оберіть країну</option>';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        loginInputs.forEach(input => {
            if (input.type !== 'checkbox' && !validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            const data = Object.fromEntries(new FormData(loginForm));
            const saved = JSON.parse(localStorage.getItem("user"));
            console.log(saved)
            if (saved && saved.email === data.username) {
              onSuccess();
            } else {
              alert("Невірні дані"); // заміни на модальний або інший UI
            }
            loginForm.reset();
            loginInputs.forEach(input => {
                if (input.type !== 'checkbox') {
                    input.classList.remove('valid', 'invalid');
                }
            });
            
            alert('Авторизація успішна!');
        }
    });

    document.getElementById('close-success').addEventListener('click', function() {
        document.getElementById('success-message').classList.remove('show');
    });
});
}

export function isLoggedIn() {
  return !!localStorage.getItem("user");
}

export function logout() {
  localStorage.removeItem("user");
}


let allUsers = [];
let currentPage = 1;
const USERS_PER_PAGE = 10;

function displayPage(page) {
  const filtered = applyFilters(allUsers);
  const totalPages = Math.ceil(filtered.length / USERS_PER_PAGE);
  currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const pageUsers = filtered.slice(start, start + USERS_PER_PAGE);

  renderUsers(pageUsers);
  renderPagination(totalPages, currentPage, displayPage);
}

function showMain() {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('main-container').style.display = 'block';
}

function showAuth() {
  document.getElementById('auth').style.display = 'block';
  document.getElementById('main-container').style.display = 'none';
}

async function startApp() {
  try {
    allUsers = await fetchUsers(50);
    displayPage(1);
  } catch (err) {
    showError(err.message || "Помилка при завантаженні користувачів.");
  }
}

document.getElementById('logout-btn').addEventListener('click', () => {
  logout();
  showAuth();
});

setupFilterListeners(() => displayPage(1));

// Таб-перемикач для авторизації / реєстрації
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".form").forEach((f) => f.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`${tab.dataset.tab}-form`).classList.add("active");
  });
});

if (isLoggedIn()) {
  showMain();
  startApp();
} else {
  initAuth(() => {
    showMain();
    startApp();
  });
}

let filters = {
  query: '',
  sort: 'name-asc'
};

function setupFilterListeners(callback) {
  document.getElementById('search-input').addEventListener('input', (e) => {
    filters.query = e.target.value.toLowerCase();
    callback();
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    filters.sort = e.target.value;
    callback();
  });
}

function applyFilters(users) {
  let result = [...users];

  if (filters.query) {
    result = result.filter(user =>
      user.name.first.toLowerCase().includes(filters.query) ||
      user.name.last.toLowerCase().includes(filters.query)
    );
  }

  result.sort(getSortFunction(filters.sort));
  return result;
}

function getSortFunction(type) {
  switch (type) {
    case 'name-asc': return (a, b) => a.name.first.localeCompare(b.name.first);
    case 'name-desc': return (a, b) => b.name.first.localeCompare(a.name.first);
    case 'age-asc': return (a, b) => a.dob.age - b.dob.age;
    case 'age-desc': return (a, b) => b.dob.age - a.dob.age;
    case 'date-asc': return (a, b) => new Date(a.registered.date) - new Date(b.registered.date);
    case 'date-desc': return (a, b) => new Date(b.registered.date) - new Date(a.registered.date);
    default: return () => 0;
  }
}


function renderUsers(users) {
  const container = document.getElementById('user-list');
  container.innerHTML = '';
  if (users.length === 0) {
    container.innerHTML = '<p>Нічого не знайдено.</p>';
    return;
  }

  for (const user of users) {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}" />
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>Вік: ${user.dob.age}</p>
      <p>Телефон: ${user.phone}</p>
      <p>Email: ${user.email}</p>
      <p>Локація: ${user.location.city}, ${user.location.country}</p>
    `;
    container.appendChild(card);
  }
}

function renderPagination(totalPages, currentPage, onPageChange) {
  const container = document.getElementById('pagination');
  container.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.addEventListener('click', () => onPageChange(i));
    container.appendChild(btn);
  }
}

function showError(msg) {
  const container = document.getElementById('error');
  container.textContent = msg;
  container.classList.add('visible');
}
