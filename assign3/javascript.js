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
    let vals = words.split(' ');
    let first = vals[0].split('').sort().join('');
    for (let i = 1; i < vals.length; i++) {
        if (first != vals[i].split('').sort().join('')) {
            return false;
        }
    }
    return true;
}

function props(list, propertyName) {
    let retVals = [];
    for (let i = 0; i < list.length; i++) {
        retVals.push(list[i][propertyName]);
    }
    return retVals;
}

function grouper(xs, n) {
    let retVal = [];
    let group = [];
    for (let i = 0; i < xs.length; i = i + n) {
        for (let j = 0; j < n; j++) {
            if (xs[i + j] != undefined) {
                group.push(xs[i + j]);
            }
        }
        retVal.push(group);
        group = [];
    }
    return retVal;
}

function sequence(start, step) {
    let count = 0;
    return () => {
        let retVal = start + step * count;
        count++;
        return retVal;
    };
}

function repeat(text, n) {
    let retVal = '';
    for (let i = 0; i < n; i++) {
        retVal = retVal + text;
    }
    return retVal;
}

function repeatf(f, n) {
    let retVal = [];
    for (let i = 0; i < n; i++) {
        retVal.push(f());
    }
    return retVal;
}

function matchmaker(obj) {
    let keys = Object.keys(obj);
    return (input) => {
        for (let i = 0; i < keys.length; i++) {
            if (input[keys[i]] != obj[keys[i]]) {
                return false;
            }
        }
        return true;
    }
}

function breakup(list , partitioner) {
    let retVal = {};
    for (let i = 0; i < list.length; i++) {
        let val = partitioner(list[i]);
        if (retVal[val] == undefined) {
            retVal[val] = [];
        }
        retVal[val].push(list[i]);
    }
    return retVal;
}

function none(list, predicate) {
    for (let i = 0; i < list.length; i++) {
        if (predicate(list[i]) == true) {
            return false;
        }
    }
    return true;
}

function noSql(list, query) {
    let retVal = [];
    let keys = Object.keys(query);
    for (let i = 0; i < list.length; i++) {
        let same = true;
        for (let j = 0; j< keys.length; j++) {
            if (list[i][keys[j]] != query[keys[j]]) {
                same = false;
            }
        }
        if (same == true) {
            retVal.push(list[i]);
        }
    }
    return retVal;
}

function myChoice(items) {
    let val = Math.floor(Math.random() * items.length);
    return (...args) => {
        if (args[0] == 'rechoose') {
            let newRand = Math.floor(Math.random() * items.length);
            while (newRand == val) {
                newRand = Math.floor(Math.random() * items.length);
            }
            val = newRand;
        }
        return items[val];
    };
}