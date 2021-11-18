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

// console.log(eligibility( 35, 'CA', true, 3));
// console.log(eligibility( 61, 'wi', true, 3));
// console.log(eligibility( 38, 'WI', false ));