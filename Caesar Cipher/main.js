//Вариант №6, значит смещение = 8
const shift = 8;

function encrypt(string) {
    const str = string.toUpperCase().split('');
    for (let i = 0; i < str.length; ++i) {
        // Tranform into decimal code
        let chr = str[i];
        let shiftChange;
        chr = chr.charCodeAt();
        if (chr >= 1040 && chr <= 1071) {
            chr += shift;
            //проверка символа, чтобы попадал под utf-16 после смещения
            if (chr > 1071) {
                shiftChange = chr - 1071;
                chr = 1039 + shiftChange;
            } else if (chr < 1040) {
                shiftChange = 1040 - chr;
                chr = 1072 - shiftChange;
            }
        }
        //перевод из кода в символ
        str[i] = String.fromCharCode(chr);
    }
    return str.join('');
}

function decrypt(string) {
    const str = string.toUpperCase().split('');

    for (let i = 0; i < str.length; ++i) {
        let chr = str[i];
        let shiftChange;
        chr = chr.charCodeAt();
        if (chr >= 1040 && chr <= 1071) {
            //изменяем только след. строку
            chr -= shift;
            if (chr > 1071) {
                shiftChange = chr - 1071;
                chr = 1039 + shiftChange;
            } else if (chr < 1040) {
                shiftChange = 1040 - chr;
                chr = 1072 - shiftChange;
            }
        }
        str[i] = String.fromCharCode(chr);
    }
    return str.join('');
}


document.getElementById('inputTextE').oninput = function() {
    document.getElementById('outEncrypt').innerHTML = encrypt(this.value);
}
document.getElementById('inputTextD').oninput = function() {
    document.getElementById('outDecrypt').innerHTML = decrypt(this.value);
}


