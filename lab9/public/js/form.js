let form = document.getElementById('number-form');
let input = document.getElementById('number-input');
let error = document.getElementById('error');
let list = document.getElementById('attempts');

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i < num; i++) {
        if ((num % i) == 0) return false;
    }
    return true;
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        input.value = input.value.trim();
        if (input.value) {
            error.hidden = true;
            const prime = isPrime(Number(input.value));
            let li = document.createElement('li');
            li.innerHTML = prime ? input.value + ' is a prime number' : input.value + ' is NOT a prime number';
            prime ? li.classList.add('is-prime') : li.classList.add('not-prime');
            list.appendChild(li);
            form.reset();
        } else {
            input.value = '';
            error.hidden = false;
        }
        input.focus();
    });
}