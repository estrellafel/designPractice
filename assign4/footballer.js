// Felix Estrella
document.addEventListener('DOMContentLoaded', generateTeamsTable);

function generateTeamsTable() {
    table = document.getElementById('teams');

    thead = document.createElement('thead');
    headTr = mainHead();
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
            tbody = document.createElement('tbody');
            tr = mainBody(team);
            
            tr.addEventListener('click', () => {
                hideTable();
                showForm();
                makeTeamCaption(team);
                makeTeamHead();
                all(team);
                checkForm(team);
            });

            tbody.appendChild(tr);
            table.appendChild(tbody);
        });
    });
}

function mainHead() {
    headTr = document.createElement('tr');
    list = ['City', 'Name', 'Wins', 'Losses', 'Ties','Points'];
    list.filter( x => {
        th = document.createElement('th');
        text = document.createTextNode(x);
        th.appendChild(text);
        headTr.appendChild(th);
    });
    return headTr;
}

function mainBody(team) {
    tr = document.createElement('tr');
    params = ['city', 'name'];
    params.forEach(i => {
        th = document.createElement('th');
        text = document.createTextNode(team[i]);
        th.appendChild(text);
        tr.appendChild(th);
     });

    stat = team['stats'];
    params = ['wins', 'losses', 'ties'];
    params.forEach(i => {
        th = document.createElement('th');
        text = document.createTextNode(stat[i]);
        th.appendChild(text);
        tr.appendChild(th);
    });

    points = (stat['wins'] * 2) + (stat['ties']);
    th = document.createElement('th');
    text = document.createTextNode(points);
    th.appendChild(text);
    tr.appendChild(th);

    return tr;
}

function hideTable() {
    div = document.getElementById('teams-container');
    div.style.display = 'none';
}

function showForm() {
    form = document.getElementById('games-container');
    form.style.display = 'inline';
}

function makeTeamHead(team) {
    thead = document.createElement('thead');
    tr = document.createElement('tr');
    params = ['Home', 'Score', 'Away', 'Score', 'Date', 'Result'];
    params.forEach(i => {
        td = document.createElement('td');
        text = document.createTextNode(i);
        td.appendChild(text);
        tr.appendChild(td);
    });
    thead.appendChild(tr);
    table = document.getElementById('games');
    table.appendChild(thead);
}

function makeTeamCaption(team) {
    caption = document.createElement('caption');
    text = document.createTextNode(team['name']);
    caption.appendChild(text);
    table = document.getElementById('games');
    table.appendChild(caption);
}

function all(team) {
    cleanGameTable();
    baller.getGames(team['id'], (err, games) => {
        games.sort((first, second) => {
            if (first['date'] > second['date']) {
                return -1;
            } else {
                return 1;
            }
        });
        tbody = getBody(games, team);
        tbody.id = 'gamesBody';
        table = document.getElementById('games');
        table.appendChild(tbody);
    });
}

function getBody(games, team) {
    tbody = document.createElement('tbody');
    games.forEach((game) => {
        tr = document.createElement('tr');

        td = document.createElement('td');
        text = document.createTextNode(game['home']['name']);
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
    wins(team);
}

function wins(team) {
    radio = document.getElementById('winsOnly');
    radio.addEventListener('click', () => {
        cleanGameTable();
    });
}

function losses(team) {
    radio = document.getElementById('lossesOnly');
    radio.addEventListener('click', () => {
        cleanGameTable();
    });
}

function ties(team) {
    radio = document.getElementById('winsOnly');
    radio.addEventListener('click', () => {
        cleanGameTable();
    });
}

function cleanGameTable() {
    tbody = document.getElementById('gamesBody');
    if (tbody) {
        tbody.remove();
    }
}