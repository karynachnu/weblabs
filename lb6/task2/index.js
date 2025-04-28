const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');
    const sortButtons = document.querySelectorAll('.sort-buttons button');

    let todos = [];
    let sortBy = 'created';

    const createTodo = (text) => ({
      id: Date.now(),
      text,
      completed: false,
      created: new Date(),
      updated: new Date()
    });

    const renderTodos = (items) => {
      list.innerHTML = '';
      items.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item fade-in ${todo.completed ? 'completed' : ''}`;

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        span.addEventListener('click', () => toggleComplete(todo.id));

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.textContent = 'Редагувати';
        editBtn.addEventListener('click', () => editTodo(todo.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Видалити';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        actions.append(editBtn, deleteBtn);
        li.append(span, actions);
        list.appendChild(li);
      });
    };

    const addTodo = () => {
      const text = input.value.trim();
      if (!text) return;
      todos.push(createTodo(text));
      input.value = '';
      sortAndRender();
    };

    const deleteTodo = (id) => {
      todos = todos.filter(t => t.id !== id);
      sortAndRender();
    };

    const editTodo = (id) => {
      const newText = prompt('Редагувати завдання:', todos.find(t => t.id === id).text);
      if (newText !== null) {
        todos = todos.map(t => t.id === id ? { ...t, text: newText.trim(), updated: new Date() } : t);
        sortAndRender();
      }
    };

    const toggleComplete = (id) => {
      todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed, updated: new Date() } : t);
      sortAndRender();
    };

    const sortAndRender = () => {
      let sorted = [...todos];
      if (sortBy === 'created') sorted.sort((a, b) => a.created - b.created);
      if (sortBy === 'updated') sorted.sort((a, b) => b.updated - a.updated);
      if (sortBy === 'completed') sorted.sort((a, b) => a.completed - b.completed);
      renderTodos(sorted);
    };

    addBtn.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });

    sortButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sortBy = btn.dataset.sort;
        sortAndRender();
      });
    });