// Function to reset all displayed stats and points
function resetAllStats() {
   // Clear all dynamically added player stats
   const playerStatsElements = document.querySelectorAll('span');
   playerStatsElements.forEach(element => {
       element.textContent = ''; // Clear the content of each element
   });


   // Reset team points to 0
   const teamPointsElements1 = document.getElementById('team1Points');
   teamPointsElements1.textContent = 'Team 1 Points: 0';


   const teamPointsElements2 = document.getElementById('team2Points');
       teamPointsElements2.textContent = 'Team 2 Points: 0';


       const teamPointsElements3 = document.getElementById('team3Points');
           teamPointsElements3.textContent = 'Team 3 Points: 0';


           const teamPointsElements4 = document.getElementById('team4Points');
               teamPointsElements4.textContent = 'Team 4 Points: 0';


               const teamPointsElements5 = document.getElementById('team5Points');
                   teamPointsElements5.textContent = 'Team 5 Points: 0';


                   const teamPointsElements6 = document.getElementById('team6Points');
                       teamPointsElements6.textContent = 'Team 6 Points: 0';


                       const teamPointsElements7 = document.getElementById('team7Points');
                           teamPointsElements7.textContent = 'Team 7 Points: 0';


                           const teamPointsElements8 = document.getElementById('team8Points');
                               teamPointsElements8.textContent = 'Team 8 Points: 0';


}


// Select the reset button
const resetButton = document.getElementById('resetButton');


// Add event listener to the reset button
resetButton.addEventListener('click', resetAllStats);




function fetchPlayerStats(playerName) {
    const option = document.getElementById('teamSelect').value; // Get the selected option from the dropdown

    const apiUrl = `https://api.blockwars.games/v1/player/name/${playerName}`;

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.stats) {
            const statsWithPlacement = {};
            data.stats.forEach(stat => {
                if (option === '1') {
                    if (stat.key.includes('1') && !stat.key.includes('nc')) {
                        const { points } = stat.value;
                        statsWithPlacement.points = points;
                    }
                } else if (option === '1nc') {
                    if (stat.key.includes('1') && stat.key.includes('nc')) {
                        const { points } = stat.value;
                        statsWithPlacement.points = points;
                    }
                } else if (option === '2') {
                    if (stat.key.includes('2') && !stat.key.includes('nc')) {
                        const { points } = stat.value;
                        statsWithPlacement.points = points;
                    }
                } else if (option === '2nc') {
                    if (stat.key.includes('2') && stat.key.includes('nc')) {
                        const { points } = stat.value;
                        statsWithPlacement.points = points;
                    }
                }
                else if (option === 'CC') {
                                    if (stat.key.includes('cc') && !stat.key.includes('nc')) {
                                        const { points } = stat.value;
                                        statsWithPlacement.points = points;
                                    }
                                }
                                else if (option === 'CCnc') {
                                                    if (stat.key.includes('cc') && stat.key.includes('nc')) {
                                                        const { points } = stat.value;
                                                        statsWithPlacement.points = points;
                                                    }
                                                }
            });
            console.log('StatsWithPlacement:', statsWithPlacement);
            return statsWithPlacement;
        } else {
            console.log('Stats object not found in the response');
            throw new Error('Stats object not found in the response');
        }
    })
    .catch(error => {
        console.error('Error fetching player statistics:', error);
        return { points: 0 }; // Return an object with points set to 0 in case of error
    });
}







// Function to update team points in the DOM
function updateTeamPoints(teamId) {
   let teamPoints = 0;


   for (let i = 1; i <= 5; i++) {
       const playerName = document.getElementById(`team${teamId}Player${i}`).value.trim();
       fetchPlayerStats(playerName)
           .then(statsWithPlacement => {
               teamPoints += statsWithPlacement.points;
               const teamPointsElement = document.getElementById(`team${teamId}Points`);
               teamPointsElement.textContent = `Team ${teamId} Points: ${teamPoints}`;
           })
           .catch(error => {
               console.error('Error fetching player stats for team', teamId, ':', error);
           });
   }
}


// Select all fetchPlayerStatsBtn buttons
const fetchPlayerStatsBtns = document.querySelectorAll('.fetchPlayerStatsBtn');


// Add event listener to each button
fetchPlayerStatsBtns.forEach(btn => {
   btn.addEventListener('click', () => {
       // Get the player name from the corresponding input text box
       const playerName = btn.previousElementSibling.value.trim();


       // Call the fetchPlayerStats function with the playerName
       fetchPlayerStats(playerName)
           .then(statsWithPlacement => {
               // Log or use the statsWithPlacement object as needed
               console.log('Player Stats:', statsWithPlacement);


               // Optionally, you can display the stats beside the input box
               const playerStatsElement = document.createElement('span');
              playerStatsElement.textContent = `Player ${playerName}: Points(${statsWithPlacement.points})`;
               btn.parentNode.appendChild(playerStatsElement); // Append stats element next to the button
           })
           .catch(error => {
               console.error('Error fetching player stats:', error);
           });
   });
});
// Function to compare points of all teams and display in a popup
// Function to compare points of all teams and display in a popup
function compareAllTeams() {
    const teams = [];

    // Update team points with a delay
    for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
            updateTeamPoints(i);
        }, i * 1000); // Wait for i seconds (e.g., 1 second for team 1, 2 seconds for team 2, etc.)
    }

    // Wait for 8 seconds before continuing
    setTimeout(() => {
        // Loop through each team to get their points and player names
        for (let i = 1; i <= 8; i++) {
            const teamPointsElement = document.getElementById(`team${i}Points`);
            const teamPoints = parseFloat(teamPointsElement.textContent.split(': ')[1]);
            const players = [];
            for (let j = 1; j <= 5; j++) {
                const playerName = document.getElementById(`team${i}Player${j}`).value.trim();
                if (playerName) {
                    players.push(playerName);
                }
            }
            teams.push({ teamId: i, points: teamPoints, players: players });
        }

        // Sort teams by points in descending order
        teams.sort((a, b) => b.points - a.points);

        // Prepare message for the popup
        let message = '<h2>Teams Ranking by Points</h2>';
        teams.forEach(team => {
            message += `<h3>Team ${team.teamId}: ${team.points} Points</h3>`;
            if (team.players.length > 0) {
                message += '<ul>';
                team.players.forEach(player => {
                    message += `<li>${player}</li>`;
                });
                message += '</ul>';
            } else {
                message += '<p>No players found</p>';
            }
        });

        // Display popup
        const popup = window.open('', 'Teams Comparison', 'width=400,height=400');
        popup.document.write(message);
    }, 12000);
}




// Select the compare all teams button
const compareAllTeamsBtn = document.getElementById('compareAllTeamsBtn');


// Add event listener to the compare all teams button
compareAllTeamsBtn.addEventListener('click', compareAllTeams);




// Add event listeners to fetch team stats buttons to update team stats
const fetchTeamStatsBtns = document.querySelectorAll('.fetchTeamStatsBtn');
fetchTeamStatsBtns.forEach(btn => {
   btn.addEventListener('click', () => {
       const teamId = btn.dataset.team; // Get the team ID from the button's data attribute
       updateTeamPoints(teamId); // Call updateTeamPoints function with the team ID
   });
});
