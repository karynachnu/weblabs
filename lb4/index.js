// Завдання 1
function task1() {
    let fruits = ["яблуко", "банан", "груша", "апельсин"];
    fruits.pop();
    console.log("Завдання 1.1:", fruits);
    
    fruits.unshift("ананас");
    console.log("Завдання 1.2:", fruits);
    
    fruits.sort().reverse();
    console.log("Завдання 1.3:", fruits);
    
    let appleIndex = fruits.indexOf("яблуко");
    console.log("Завдання 1.4: Індекс яблука -", appleIndex);
}

// Завдання 2
function task2() {
    let colors = ["червоний", "синій", "жовтий", "зелений", "чорно-синій"];
    let longest = colors.reduce((a, b) => (a.length > b.length ? a : b));
    let shortest = colors.reduce((a, b) => (a.length < b.length ? a : b));
    console.log("Завдання 2.1: Найдовший -", longest, "Найкоротший -", shortest);
    
    colors = colors.filter(color => color.includes("синій"));
    console.log("Завдання 2.2:", colors);
    
    let joinedColors = colors.join(", ");
    console.log("Завдання 2.3:", joinedColors);
}

// Завдання 3
function task3() {
    let employees = [
        { name: "Катерина", age: 30, position: "розробник" },
        { name: "Саша", age: 25, position: "дизайнер" },
        { name: "Василь", age: 35, position: "розробник" }
    ];
    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Завдання 3.1:", employees);
    
    let developers = employees.filter(emp => emp.position === "розробник");
    console.log("Завдання 3.2:", developers);
    
    employees = employees.filter(emp => emp.age !== 25);
    console.log("Завдання 3.3:", employees);
    
    employees.push({ name: "Марія", age: 29, position: "тестувальник" });
    console.log("Завдання 3.4:", employees);
}

// Завдання 4
function task4() {
    let students = [
        { name: "Олексій", age: 20, course: 2 },
        { name: "Степан", age: 22, course: 3 },
        { name: "Марина", age: 19, course: 1 }
    ];
    students = students.filter(student => student.name !== "Олексій");
    console.log("Завдання 4.1:", students);
    
    students.push({ name: "Дмитро", age: 21, course: 2 });
    console.log("Завдання 4.2:", students);
    
    students.sort((a, b) => b.age - a.age);
    console.log("Завдання 4.3:", students);
    
    let thirdCourseStudent = students.find(student => student.course === 3);
    console.log("Завдання 4.4:", thirdCourseStudent);
}

// Завдання 5
function task5() {
    let numbers = [1, 2, 3, 4, 5];
    let squaredNumbers = numbers.map(num => num ** 2);
    console.log("Завдання 5.1:", squaredNumbers);
    
    let evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log("Завдання 5.2:", evenNumbers);
    
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    console.log("Завдання 5.3:", sum);
    
    numbers = [...numbers, 6, 7, 8, 9, 10];
    console.log("Завдання 5.4:", numbers);
    
    numbers.splice(0, 3);
    console.log("Завдання 5.5:", numbers);
}

let books = [
    { title: "Голодні ігри", author: "Сюзанна Колінз", genre: "Фентезі", pages: 300, isAvailable: true },
    { title: "П'ятеро поросят", author: "Агата Крісті", genre: "Детектив", pages: 250, isAvailable: false }
];

function addBook(title, author, genre, pages) {
    books.push({ title, author, genre, pages, isAvailable: true });
    console.log("Додано книгу:", title);
}

function removeBook(title) {
    books = books.filter(book => book.title !== title);
    console.log("Видалено книгу:", title);
}

function findBooksByAuthor(author) {
    let result = books.filter(book => book.author === author);
    console.log("Книги автора", author, ":", result);
    return result;
}

function toggleBookAvailability(title, isBorrowed) {
    let book = books.find(book => book.title === title);
    if (book) {
        book.isAvailable = !isBorrowed;
        console.log("Статус доступності книги", title, ":", book.isAvailable);
    }
}

function sortBooksByPages() {
    books.sort((a, b) => a.pages - b.pages);
    console.log("Книги відсортовані за кількістю сторінок:", books);
}

function getBooksStatistics() {
    let total = books.length;
    let available = books.filter(b => b.isAvailable).length;
    let borrowed = books.filter(b => !b.isAvailable).length;
    let averagePages = total ? books.reduce((sum, b) => sum + b.pages, 0) / total : 0;
    let stats = { total, available, borrowed, averagePages };
    console.log("Статистика бібліотеки:", stats);
    return stats;
}

function logBooks() {
    console.log("Список книг:", books);
}

// Завдання 7
function task7() {
    let student = { name: "Василь", age: 21, course: 3 };
    student.subjects = ["Математика", "Фізика", "Програмування"];
    delete student.age;
    console.log("Завдання 7:", student);
}

task1();
task2();
task3();
task4();
task5();
logBooks();
addBook("Маленьке життя", "Ганья Янаґігара", "Роман", 400);
removeBook("Голодні ігри");
findBooksByAuthor("Агата Крісті");
toggleBookAvailability("П'ятеро поросят", true);
sortBooksByPages();
getBooksStatistics();
logBooks();
task7();
