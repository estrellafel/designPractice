// Felix Estrella

function eligibility(age, state, filed, dependents) {
    let check_age;
    if (age < 60) {
        check_age = false;
    } else {
        check_age = true;
    }

    let check_state;
    if (state.toUpperCase() == 'IA' || state.toUpperCase() == 'WI') {
        check_state = true;
    } else {
        check_state = false;
    }

    let check_dependents;
    if (dependents >= 1 && dependents <= 5) {
        check_dependents = true;
    } else {
        check_dependents = false;
    }
    return check_age && check_state && filed && check_dependents;
}

function oddlyEven(data) {
    if (typeof data == 'string') {
        return decode(data);
    } else if (typeof data == 'number') {
        return encode(data);
    } else {
        return undefined;
    }
}

function encode(data) {
    data = data.toString().split('');
    let retVal = '';
    let seperator = ':';

    for(let i = 0; i < data.length; i++) {
        if (i == data.length - 1) {
            seperator = '';
        }
        if (data[i] == 0) {
            retVal = retVal.concat('*',seperator);
        } else if (data[i] == 1) {
            retVal = retVal.concat('#',seperator);
        } else if (data[i] == 2) {
            retVal = retVal.concat('**',seperator);
        } else if (data[i] == 3) {
            retVal = retVal.concat('##',seperator);
        } else if (data[i] == 4) {
            retVal = retVal.concat('***',seperator);
        } else if (data[i] == 5) {
            retVal = retVal.concat('###',seperator);
        } else if (data[i] == 6) {
            retVal = retVal.concat('****',seperator);
        } else if (data[i] == 7) {
            retVal = retVal.concat('####',seperator);
        } else if (data[i] == 8) {
            retVal = retVal.concat('*****',seperator);
        } else if (data[i] == 9) {
            retVal = retVal.concat('#####',seperator);
        } else {
            return undefined;
        }
    }

    return retVal;
}

function decode(data) {
    data = data.toString().split(':');
    let retVal = '';
    let seperator = '';

    for(let i = 0; i < data.length; i++) {
        if (data[i] == '*') {
            retVal = retVal.concat('0',seperator);
        } else if (data[i] == '#') {
            retVal = retVal.concat('1',seperator);
        } else if (data[i] == '**') {
            retVal = retVal.concat('2',seperator);
        } else if (data[i] == '##') {
            retVal = retVal.concat('3',seperator);
        } else if (data[i] == '***') {
            retVal = retVal.concat('4',seperator);
        } else if (data[i] == '###') {
            retVal = retVal.concat('5',seperator);
        } else if (data[i] == '****') {
            retVal = retVal.concat('6',seperator);
        } else if (data[i] == '####') {
            retVal = retVal.concat('7',seperator);
        } else if (data[i] == '*****') {
            retVal = retVal.concat('8',seperator);
        } else if (data[i] == '#####') {
            retVal = retVal.concat('9',seperator);
        } else {
            return undefined;
        }
    }
    return Number(retVal);
}

function allAnagrams(words) {
    
}

// console.log(eligibility( 35, 'CA', true, 3));
// console.log(eligibility( 61, 'wi', true, 3));
// console.log(eligibility( 38, 'WI', false ));

// console.log(oddlyEven( 18 ));
// console.log(oddlyEven( -3 ));
// console.log(oddlyEven( 183 ));
// console.log(oddlyEven( '#:*****:##' ));
// console.log(oddlyEven( 'CS' ));
// console.log(oddlyEven( oddlyEven(318) ));