function sumFirst50() {
    let sum = 0;
    let i = 1;
    while (i <= 50) {
      sum += i;
      i++;
    }
    console.log("Завдання 1:", sum);
  }
  
  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    console.log("Завдання 2:", result);
  }
  
  function getMonth(num) {
    switch (num) {
      case 1: console.log("Завдання 3: Січень"); break;
      case 2: console.log("Завдання 3: Лютий"); break;
      case 3: console.log("Завдання 3: Березень"); break;
      case 4: console.log("Завдання 3: Квітень"); break;
      case 5: console.log("Завдання 3: Травень"); break;
      case 6: console.log("Завдання 3: Червень"); break;
      case 7: console.log("Завдання 3: Липень"); break;
      case 8: console.log("Завдання 3: Серпень"); break;
      case 9: console.log("Завдання 3: Вересень"); break;
      case 10: console.log("Завдання 3: Жовтень"); break;
      case 11: console.log("Завдання 3: Листопад"); break;
      case 12: console.log("Завдання 3: Грудень"); break;
      default: console.log("Завдання 3: Невірний номер місяця");
    }
  }
  
  function sumEvenNumbers(arr) {
    let sum = 0;
    for (let num of arr) {
      if (num % 2 === 0) {
        sum += num;
      }
    }
    console.log("Завдання 4: Сума парних чисел у масиві:", sum);
  }
  
  const countVowels = (str) => {
    const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯ";
    const count = [...str].filter(char => vowels.includes(char)).length;
    console.log("Завдання 5:", count);
  };

  function power(base, exponent) {
    const result = Math.pow(base, exponent);
    console.log("Завдання 6:", result);
  }
  
  sumFirst50();
  factorial(5);
  getMonth(4); 
  sumEvenNumbers([1, 2, 3, 4, 5, 6]);
  countVowels("Якийсь текст");
  power(2, 3); 
  