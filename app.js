const bdate = document.querySelector('.bdate');
const form = document.querySelector('form');
const result = document.querySelector('.result');
let palindromeArray = [];
let missedby = 0;


form.addEventListener('submit', (e) => {

    // resets
    e.preventDefault();
    result.innerHTML = '';
    palindromeArray = [];
    missedby = 0;


    const birthDate = new Date(bdate.value);

    somefunction(birthDate)
});

// this function formats the birthdate in different sequences
function dateFormat(dd, mm, yyyy, yy) {

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }


    const dateFormats = {
        "dd-mm-yyyy": dd + mm + yyyy,
        "dd-yyyy-mm": dd + yyyy + mm,
        "mm-dd-yyyy": mm + dd + yyyy,
        "mm-yyyy-dd": mm + yyyy + dd,
        "yyyy-mm-dd": yyyy + mm + dd,
        "yyyy-dd-mm": yyyy + dd + mm,
        "dd-mm-yy": dd + mm + yy,
        "dd-yy-mm": dd + yy + mm,
        "mm-dd-yy": mm + dd + yy,
        "mm-yy-dd": mm + yy + dd,
        "yy-mm-dd": yy + mm + dd,
        "yy-dd-mm": yy + dd + mm,
    }

    return dateFormats;
};

// comparing every date format from dateFormats with reversed version one at a time, to check if it is a palindrome in that format

function compareFunction(key, d) {

    const reverseStr = reverseFunction(d);

    if (d === reverseStr) {

        palindromeArray.push(`is palindrome in format ${key} = ${reverseStr}`);
    }
};

// function to reverse the date, d is date in a particular format from dateFormats object
function reverseFunction(d) {

    let reverseStr = "";

    for (let i = d.length - 1; i >= 0; i--) {

        reverseStr += d[i];
    }

    return reverseStr
};

// ~~~~~~~~~PART TWO - FIND NEXT PALINDROME DATE~~~~~~~~~~~~~

const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function somefunction(birthDate) {

    let dd = birthDate.getDate();
    let mm = (birthDate.getMonth());
    let yyyy = birthDate.getFullYear();
    const yy = Number(yyyy.toString().slice(2, 4));


    for (let k = yyyy; palindromeArray.length < 1; k++) {

        // check for leap year and change daysInMonths feb value
        if ((k / 4) % 1 !== 0 || (k / 4) % 1 === 0 && (k / 100) % 1 === 0 && (k / 400) % 1 !== 0) {
            daysInMonths[1] = 28;

        } else {
            daysInMonths[1] = 29;
        }

        for (let j = mm + 1; j <= 12 && palindromeArray.length < 1; j++) {

            for (let i = dd; i <= daysInMonths[mm]; i++) {

                const dateFormats = dateFormat(
                    i.toString(),
                    j.toString(),
                    yyyy.toString(),
                    yy.toString());

                // array of all keys in dateFormats
                const dateFormatkeys = Object.keys(dateFormats);

                dateFormatkeys.forEach(key => {

                    compareFunction(key, dateFormats[key]);
                })

                if (palindromeArray.length > 0 && missedby === 0) {

                    const p = document.createElement('p');

                    p.innerText = `yay! your bday ${palindromeArray[0]}`;
                    result.appendChild(p);
                    result.style.display = 'block';
                    break;

                } else if (palindromeArray.length > 0) {

                    const p = document.createElement('p');

                    p.innerText = 'nearest date ' + palindromeArray[0] + ` missed by ${missedby} days`;
                    result.appendChild(p);
                    result.style.display = 'block';

                    break;
                }
                missedby += 1;
            }
            dd = 1;
        }
        mm = 1
    }
}