// Felix Estrella
document.addEventListener('DOMContentLoaded', generateTeamsTable);

function generateTeamsTable() {
    let table = document.getElementById('teams');

    let thead = document.createElement('thead');
    let headTr = mainHead();
    thead.appendChild(headTr);

    baller.getTeams( (Null, teams) => {
        table.appendChild(thead);

        // Sort by wins and if the same by name
        teams.sort( (first, second) => {
            if ((first['stats']['wins'] * 2) + first['stats']['ties'] > (second['stats']['wins'] * 2) + second['stats']['ties']) {
                return -1;
            } else if ((second['stats']['wins'] * 2) + second['stats']['ties'] > (first['stats']['wins'] * 2) + first['stats']['ties']) {
                return 1;
            } else {
                if (first['stats']['wins'] > second['stats']['wins']) {
                    return -1;
                } else if (second['stats']['wins'] > first['stats']['wins']) {
                    return 1;
                } else {
                    if (first['name'] > second['name']) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            }
        });

        teams.forEach(team => {
            let tbody = document.createElement('tbody');
            let tr = mainBody(team);
            
            tr.addEventListener('click', () => {
                hideTable();
                showForm();
                makeTeamCaption(team);
                makeTeamHead();
                start(team);
                checkForm(team);
            });

            tbody.appendChild(tr);
            table.appendChild(tbody);
        });
    });
}

function mainHead() {
    let headTr = document.createElement('tr');
    let list = ['City', 'Name', 'Wins', 'Losses', 'Ties','Points'];
    list.filter( x => {
        let th = document.createElement('th');
        let text = document.createTextNode(x);
        th.appendChild(text);
        headTr.appendChild(th);
    });
    return headTr;
}

function mainBody(team) {
    let tr = document.createElement('tr');
    let params = ['city', 'name'];
    params.forEach(i => {
        let th = document.createElement('th');
        let text = document.createTextNode(team[i]);
        th.appendChild(text);
        tr.appendChild(th);
     });

    let stat = team['stats'];
    params = ['wins', 'losses', 'ties'];
    params.forEach(i => {
        let th = document.createElement('th');
        let text = document.createTextNode(stat[i]);
        th.appendChild(text);
        tr.appendChild(th);
    });

    let points = (stat['wins'] * 2) + (stat['ties']);
    let th = document.createElement('th');
    let text = document.createTextNode(points);
    th.appendChild(text);
    tr.appendChild(th);

    return tr;
}

function hideTable() {
    let div = document.getElementById('teams-container');
    div.style.display = 'none';
}

function showTable() {
    let div = document.getElementById('teams-container');
    div.style.display = 'inline';
}

function showForm() {
    let form = document.getElementById('games-container');
    form.style.display = 'inline';

    form = document.getElementsByClassName('form-inline')[0];
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

}

function hideForm() {
    let form = document.getElementById('games-container');
    form.style.display = 'none';
}

function makeTeamHead(team) {
    let thead = document.createElement('thead');
    thead.id = 'gamesHead';
    let tr = document.createElement('tr');
    let params = ['Home', 'Score', 'Away', 'Score', 'Date', 'Result'];
    params.forEach(i => {
        let td = document.createElement('td');
        let text = document.createTextNode(i);
        td.appendChild(text);
        tr.appendChild(td);
    });
    thead.appendChild(tr);
    let table = document.getElementById('games');
    table.appendChild(thead);
}

function makeTeamCaption(team) {
    let caption = document.createElement('caption');
    caption.id = 'gamesCaption';
    let text = document.createTextNode(team['name']);
    caption.appendChild(text);
    let table = document.getElementById('games');
    table.appendChild(caption);
}

function getBody(games, team) {
    let tbody = document.createElement('tbody');
    games.forEach((game) => {
        let tr = document.createElement('tr');

        let td = document.createElement('td');
        let text = document.createTextNode(game['home']['name']);
        td.appendChild(text);
        tr.appendChild(td);

        td = document.createElement('td');
        text = document.createTextNode(game['homeScore']);
        td.appendChild(text);
        tr.appendChild(td);

        td = document.createElement('td');
        text = document.createTextNode(game['away']['name']);
        td.appendChild(text);
        tr.appendChild(td);

        td = document.createElement('td');
        text = document.createTextNode(game['awayScore']);
        td.appendChild(text);
        tr.appendChild(td);

        td = document.createElement('td');
        text = document.createTextNode(game['date'].toLocaleDateString("en-US"));
        td.appendChild(text);
        tr.appendChild(td);

        td = document.createElement('td');
        if (game['home']['id'] == team['id']) {
            if (game['homeScore'] > game['awayScore']) {
                text = document.createTextNode('W');
            } else if (game['awayScore'] > game['homeScore']) {
                text = document.createTextNode('L');
            } else {
                text = document.createTextNode('T');
            }
        } else {
            if (game['homeScore'] > game['awayScore']) {
                text = document.createTextNode('L');
            } else if (game['awayScore'] > game['homeScore']) {
                text = document.createTextNode('W');
            } else {
                text = document.createTextNode('T');
            }
        }
        td.appendChild(text);
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    return tbody;
}

function checkForm(team) {
    userInput(team);
    wins(team);
    losses(team);
    ties(team);
    all(team);
}

function wins(team) {
    let radio = document.getElementById('winsOnly');
    radio.addEventListener('click', () => {
        disableRadio();
        cleanGameTable();
        baller.getGames(team['id'], (err, games) => {
            winsHelper(team, games);
        });
    });
}

function winsHelper(team, games) {
    let arr = [];
    for (let i = 0; i < games.length; i++) {
        if (games[i]['home']['id'] == team['id']) {
            if (games[i]['homeScore'] > games[i]['awayScore']) {
                arr.push(games[i]);
            }
        } else {
            if (games[i]['awayScore'] > games[i]['homeScore']) {
                arr.push(games[i]);
            }
        }
    }
    games = arr;
    games.sort((first, second) => {
        if (first['date'] > second['date']) {
            return -1;
        } else {
            return 1;
        }
    });
    let tbody = getBody(games, team);
    tbody.id = 'gamesBody';
    let table = document.getElementById('games');
    table.appendChild(tbody);
    enableRadio();
}

function losses(team) {
    let radio = document.getElementById('lossesOnly');
    radio.addEventListener('click', () => {
        disableRadio();
        cleanGameTable();
        baller.getGames(team['id'], (err, games) => {
            lossesHelper(team, games);
        });
    });
}

function lossesHelper(team, games) {
    let arr = [];
    for (let i = 0; i < games.length; i++) {
        if (games[i]['home']['id'] == team['id']) {
            if (games[i]['homeScore'] < games[i]['awayScore']) {
                arr.push(games[i]);
            }
        } else {
            if (games[i]['awayScore'] < games[i]['homeScore']) {
                arr.push(games[i]);
            }
        }
    }
    games = arr;
    games.sort((first, second) => {
        if (first['date'] > second['date']) {
            return -1;
        } else {
            return 1;
        }
    });
    let tbody = getBody(games, team);
    tbody.id = 'gamesBody';
    table = document.getElementById('games');
    table.appendChild(tbody);
    enableRadio();
}

function ties(team) {
    let radio = document.getElementById('tiesOnly');
    radio.addEventListener('click', () => {
        disableRadio();
        cleanGameTable();
        baller.getGames(team['id'], (err, games) => {
            tiesHelper(team, games);
        });
    });
}

function tiesHelper(team, games) {
    let arr = [];
    for (let i = 0; i < games.length; i++) {
        if (games[i]['homeScore'] == games[i]['awayScore']) {
            arr.push(games[i]);
        }
    }
    games = arr;
    games.sort((first, second) => {
        if (first['date'] > second['date']) {
            return -1;
        } else {
            return 1;
        }
    });
    let tbody = getBody(games, team);
    tbody.id = 'gamesBody';
    let table = document.getElementById('games');
    table.appendChild(tbody);
    enableRadio();
}

function all(team) {
    let radio = document.getElementById('all');
    radio.addEventListener('click', () => {
        disableRadio();
        cleanGameTable();
        baller.getGames(team['id'], (err, games) => {
            allHelper(team, games);
        });
    });
}

function allHelper(team, games) {
    games.sort((first, second) => {
        if (first['date'] > second['date']) {
            return -1;
        } else {
            return 1;
        }
    });
    let tbody = getBody(games, team);
    tbody.id = 'gamesBody';
    let table = document.getElementById('games');
    table.appendChild(tbody);
    enableRadio();
}

function start(team) {
    baller.getGames(team['id'], (err, games) => {
        games.sort((first, second) => {
            if (first['date'] > second['date']) {
                return -1;
            } else {
                return 1;
            }
        });
        let tbody = getBody(games, team);
        tbody.id = 'gamesBody';
        let table = document.getElementById('games');
        table.appendChild(tbody);
    });
}

function cleanGameTable() {
    let tbody = document.getElementById('gamesBody');
    while (tbody) {
        tbody.remove();
        tbody = document.getElementById('gamesBody');
    }
}

function disableRadio() {
    document.getElementById('winsOnly').disabled = true;
    document.getElementById('lossesOnly').disabled = true;
    document.getElementById('tiesOnly').disabled = true;
    document.getElementById('all').disabled = true;
}

function enableRadio() {
    document.getElementById('winsOnly').disabled = false;
    document.getElementById('lossesOnly').disabled = false;
    document.getElementById('tiesOnly').disabled = false;
    document.getElementById('all').disabled = false;
}

function userInput(team) {
    let textBox = document.getElementById('searchField');
    textBox.addEventListener('change', (event) => {
        if (document.getElementById('winsOnly').checked) {
            cleanGameTable();
            baller.getGames(team['id'], (err, games) => {
                games = takeOutByName(games, textBox);
                winsHelper(team, games);
            });
        } else if (document.getElementById('lossesOnly').checked) {
            cleanGameTable();
            baller.getGames(team['id'], (err, games) => {
                games = takeOutByName(games, textBox);
                lossesHelper(team, games);
            });
        } else if (document.getElementById('tiesOnly').checked) {
            cleanGameTable();
            baller.getGames(team['id'], (err, games) => {
                games = takeOutByName(games, textBox);
                tiesHelper(team, games);
            });
        } else if (document.getElementById('all').checked) {
            cleanGameTable();
            baller.getGames(team['id'], (err, games) => {
                games = takeOutByName(games, textBox);
                allHelper(team, games);
            });
        }
    });
}


function takeOutByName(games, textBox) {
    let arr = [];
    for (let i = 0; i < games.length; i++) {
        if (games[i]['home']['name'].toLowerCase().includes(textBox.value.toLowerCase())) {
            arr.push(games[i]);
        } else if (games[i]['away']['name'].toLowerCase().includes(textBox.value.toLowerCase())) {
            arr.push(games[i]);
        }
    }
    return arr;
}

function revert(event) {
    hideForm();
    removeCaption();
    removeHead();
    cleanGameTable();
    removeEvents();
    resetFormText();
    showTable();
}

function removeCaption() {
    let caption = document.getElementById('gamesCaption');
    if (caption) {
        caption.remove();
    }
}

function removeHead() {
    let head = document.getElementById('gamesHead');
    if (head) {
        head.remove();
    }
}


// Delete the event listeners
function removeEvents() {
    let old = document.getElementById('winsOnly');
    let newN = old.cloneNode(true);
    old.parentNode.replaceChild(newN, old);
    old.remove();

    old = document.getElementById('lossesOnly');
    newN = old.cloneNode(true);
    old.parentNode.replaceChild(newN, old);
    old.remove();

    old = document.getElementById('tiesOnly');
    newN = old.cloneNode(true);
    old.parentNode.replaceChild(newN, old);
    old.remove();

    old = document.getElementById('all');
    newN = old.cloneNode(true);
    old.parentNode.replaceChild(newN, old);
    old.remove();
    newN.checked = true;
}

function resetFormText() {
    let input = document.getElementById('searchField');
    input.value = '';
}