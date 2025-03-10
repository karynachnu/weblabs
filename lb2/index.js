function findNum(arr){
if(!Array.isArray(arr) || arr.length === 0){
    return "Некоректний масив";
}
let min = Math.min(...arr);
let max = Math.max(...arr);

return {min, max};
}

function isInRange(num, min, max){
    return num >=min && num<=max;
}
const numbers = [2, 7, 10, 4, 9, 12, 5];
console.log(findNum(numbers));
console.log(isInRange(33.2, 32, 45));


let a = false;
a = !a;
console.log(a);

function studentGrade(grade){
    if(grade == 5){
        return "Відмінно";
    }
    else if(grade == 4){
        return "Добре";
    }
    else if(grade == 3)
    {
        return "Задовільно";
    }
    else return "Незадовільно";
}
console.log(studentGrade(4));

function mounthOfYear(mounth)
{
    let winter = mounth==2 ? "Winter": "Summer";

    if(mounth>=3 && mounth<=5)
    {
        return "Spring";
        if( mounth>=6 && mounth<=8)
        {
            return "Summer";
            if(mounth>=9 && mounth<=11)
            {
                return "Fall";
            }
        }
    }
}
console.log(mounthOfYear(4));