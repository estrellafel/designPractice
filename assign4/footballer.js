// Felix Estrella
document.addEventListener('DOMContentLoaded', generateTeamsTable);
function generateTeamsTable() {
    table = document.getElementById('teams');

    // Add the heading elements
    headTr = document.createElement('tr');
    list = ['City', 'Name', 'Wins', 'Losses', 'Ties','Points'];
    list.filter( x => {
        th = document.createElement('th');
        text = document.createTextNode(x);
        th.appendChild(text);
        headTr.appendChild(th);
    });

    baller.getTeams( (Null, teams) => {
        table.appendChild(headTr);
        
        teams.forEach(team => {
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

            table.appendChild(tr);
        });
    });
}
