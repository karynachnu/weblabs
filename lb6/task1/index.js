let products = [];
    let sortBy = null;
    let filterCategory = 'all';

    const productList = document.getElementById('product-list');
    const emptyMessage = document.getElementById('empty-message');
    const totalPriceEl = document.getElementById('total-price');
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const toast = document.getElementById('toast');

    document.getElementById('add-product-btn').addEventListener('click', () => openModal());

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = form['product-id'].value || Date.now().toString();
      const name = form['product-name'].value;
      const price = parseFloat(form['product-price'].value);
      const category = form['product-category'].value;
      const image = form['product-image'].value;

      const existing = products.find(p => p.id === id);
      if (existing) {
        existing.name = name;
        existing.price = price;
        existing.category = category;
        existing.image = image;
        existing.updated = new Date();
        showToast(`Товар оновлено: ${existing.id} - ${existing.name}`);
      } else {
        products.push({ id, name, price, category, image, created: new Date(), updated: new Date() });
        showToast('Товар додано!');
      }

      form.reset();
      modal.style.display = 'none';
      render();
    });

    function openModal(product = null) {
      modal.style.display = 'flex';
      if (product) {
        form['product-id'].value = product.id;
        form['product-name'].value = product.name;
        form['product-price'].value = product.price;
        form['product-category'].value = product.category;
        form['product-image'].value = product.image;
        document.getElementById('modal-title').innerText = 'Редагування товару';
      } else {
        form.reset();
        document.getElementById('modal-title').innerText = 'Новий товар';
      }
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function render() {
      let filtered = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory);

      if (sortBy === 'price') filtered.sort((a, b) => a.price - b.price);
      else if (sortBy === 'created') filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
      else if (sortBy === 'updated') filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));

      productList.innerHTML = '';

      if (filtered.length === 0) {
        emptyMessage.style.display = 'block';
      } else {
        emptyMessage.style.display = 'none';
        filtered.forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `
            <strong>ID:</strong> ${product.id}<br>
            <strong>Назва:</strong> ${product.name}<br>
            <strong>Ціна:</strong> ${product.price} грн<br>
            <strong>Категорія:</strong> ${product.category}<br>
            <img src="${product.image}" alt="${product.name}">
            <div class="buttons">
              <button class="btn-edit">Редагувати</button>
              <button class="btn-delete">Видалити</button>
            </div>
          `;

          card.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(product.id));
          card.querySelector('.btn-edit').addEventListener('click', () => openModal(product));

          productList.appendChild(card);
        });
      }

      totalPriceEl.textContent = products.reduce((sum, p) => sum + p.price, 0) + ' грн';
    }

    function deleteProduct(id) {
      products = products.filter(p => p.id !== id);
      showToast('Товар видалено!');
      render();
    }

    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    document.querySelectorAll('.filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        filterCategory = btn.dataset.category;
        render();
      });
    });

    document.querySelectorAll('.sorters button').forEach(btn => {
      btn.addEventListener('click', () => {
        sortBy = btn.dataset.sort === 'reset' ? null : btn.dataset.sort;
        render();
      });
    });

    render();