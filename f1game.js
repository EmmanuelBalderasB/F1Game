// Define a class called Team with properties for name, engine, drivers, wins, wcc, and wdc.
// If no drivers are passed in, the drivers property defaults to an empty array.
// The class also has a winOdds property that is initially set to an empty string.

class Team {
    constructor(name, engine, drivers, wins, wcc, wdc) {
        this.name = name;
        this.engine = engine;
        this.drivers = drivers || []; // If no drivers are passed in, default to an empty array
        this.wins = wins;
        this.wcc = wcc;
        this.wdc = wdc;
        this.winOdds = '';
    }
}

// Define a class called Driver with properties for name, wins, wdc, number, totalStarts, and team.
// If no team is passed in, the team property defaults to an empty string.
// The class also includes getter and setter methods for each property.
// The constructor method calculates the win rate as the ratio of wins to total starts.
// If a team is passed in, the driver is added to the team's drivers array.
class Driver {
    constructor(name, wins, wdc, number, totalStarts, team) {
        this._name = name;
        this._wins = wins;
        this._wdc = wdc;
        this._team = team || '';
        this._number = number;
        this._totalStarts = totalStarts;
        this._winRate = wins / totalStarts;
        this._points = 0;
        if (team) { 
            team.drivers.push(this);
        }
    }
    get name() {
        return this._name;
    }
    get wins() {
        return this._wins;
    }
    get wdc() {
        return this._wdc;
    }
    get team() {
        return this._team;
    }
    get number() {
        return this._number;
    }
    get totalStarts() {
        return this._totalStarts;
    }
    get winRate() {
        return this._winRate;
    }
    get points() {
        return this._points;
    }

    set team(team) {
        this._team = team;
    }
    set points(num) {
        this._points = num;
    }
    set wins(num) {
        this._wins += num;
    }
    won() {
        this._wins += 1;
        this._totalStarts += 1;
        return {wins: this._wins, starts: this._totalStartsm, winRate: this._winRate};
    }
    notWon() {
        this._totalStarts += 1;
        return [this._wins, this._totalStartsm, this._winRate];
    }
}

// Create instances of the Team and Driver classes and assign them to variables.
// The driverArray is an array containing all the driver instances.

//Team Declaration
let mercedes = new Team('Mercedes-AMG PETRONAS F1', 'Mercedes', [], 0, 8, 7);
let redbull = new Team('Redbull Racing Honda RBPT', 'Honda/RBPT', [], 0, 5, 6);
let ferrari = new Team('Scuderia Ferrari', 'Ferrari', [], 0, 16, 15);
let mclaren = new Team('Mclaren F1 Team', 'Mercedes', [], 0, 8, 12);
let alpine = new Team('BWT Alpine F1 Team', 'Renaul E-Tech RE23', [], 0, 0 ,0);
let astonMartin = new Team('Aston Martin Aramco Cognizant F1 Team', 'Mercedes', [], 0, 0, 0);
let alphaTauri = new Team('Scuderia AlphaTauri', 'Honda/RBPT', [], 1, 0, 0);
let alfaRomeo = new Team('Alfa Romeo F1 Team Stake', 'Ferrari', [], 10, 0, 2);
let haas = new Team('MoneyGram Haas F1 Team', 'Ferrari', [], 0, 0, 0);
let williams = new Team('Williams Racing', 'Mercedes', [], 0, 9, 7);

//Driver Declaration
let lewis = new Driver('Lewis Hamilton', /* 103 */1, 7, 44, 314, mercedes);
let russell = new Driver('George Russell', 1, 0, 63, 86, mercedes);
let gasly = new Driver('Pierre Gasly', 1, 0, 10, 112, alpine);
let ocon = new Driver('Esteban Ocon', 1, 0, 31, 115, alpine);
let bottas = new Driver('Valteri Bottas', /* 10 */1, 0, 77, 204, alfaRomeo);
let zhou = new Driver('Zhou Guanyu', 0, 0, 24, 26, alfaRomeo);
let leclerc = new Driver('Charles Leclerc', /* 5 */1, 0, 16, 107, ferrari);
let sainz = new Driver('Carlos Sainz', 1, 0, 55, 167, ferrari);
let sargeant = new Driver('Logan Sargeant', 0, 0, 2, 4, williams);
let albon = new Driver('Alex Albon', 0, 0, 23, 63, williams);
let tsunoda = new Driver('Yuki Tsunoda', 0, 0, 22, 48, alphaTauri);
let devries = new Driver('Nyck De Vries', 0, 0, 45, 5, alphaTauri);
let norris = new Driver('Lando Norris', 0, 0, 4, 86, mclaren);
let piastri = new Driver('Oscar Piastri', 0, 0, 81, 4, mclaren);
let stroll = new Driver('Lance Stroll', 0, 0, 18, 126, astonMartin);
let alonso = new Driver('Fernando Alonso', /* 32 */1, 2, 14, 362, astonMartin);
let magnussen = new Driver('Kevin Magnussen', 0, 0, 20, 146, haas);
let hulkenberg = new Driver('Nico Hulkenberg', 0, 0, 27, 188, haas);
let perez = new Driver('Sergio Perez', /* 6 */1, 0, 11, 240, redbull);
let verstappen = new Driver('Max Verstappen', /* 37 */1, 2, 1, 167, redbull);

let driverArray = [lewis, russell, gasly, ocon, bottas, zhou, leclerc, sainz, sargeant, albon, tsunoda, devries, norris, piastri, stroll, alonso, magnussen, hulkenberg, perez, verstappen];

let individualStandings = [];

driverArray.forEach(driver => {
    individualStandings.push({name: driver._name, points: 0});
});

const start = (numOfRaces) => { 
    //This function takes in a team and a driver and returns the driver's win rate as a percentage.
    // If the win rate is 0, the function returns 1 instead.
    const getFixedRate = (team, driver) => {
        for (const drivr of team.drivers) {
            if (drivr === driver) {
                if (drivr._winRate === 0) {
                    return 1;
                } else {
                        // Calculate the win rate as a percentage with 2 decimal places, then multiply by 100 to convert to a whole number.
                    return drivr._winRate.toFixed(2) * 100;
                }
            }
        }
    }

    // This function calculates the total odds for each driver in the driverArray.
    // It calls getFixedRate() on each driver to get their win rate as a percentage.
    // If the win rate is 0, the function sets the value to 1 instead.
    // It returns an array containing the total odds and an array of individual odds for each driver.
    const getTotalOdds = () => {
        let total = '';
        let individual = [];
        /* driverObjects = []; */
        for (const driver of driverArray) {
        let value = getFixedRate(driver._team, driver);
        if (value === 0) {
            value = 1;
        }
        individual.push({odds: getFixedRate(driver._team, driver), driver: driver.name, driverObject: driver});
        total = +total + +value;
        }
        return [total, individual];
    }

    // This function determines the winner of a race by generating a grid of 20 drivers.
    // It calls getTotalOdds() to get the total odds and individual odds for each driver.
    // It then randomly selects drivers based on their odds until the grid is filled with 20 drivers.
    // The function returns an array containing the names of the 20 drivers in the order they finished.
    const getPlaceWinner = () => {
        let grid = [];
        let grid2 = [];
        let [totalOdds, totalIndividuals] = getTotalOdds();
        while (grid.length < 20) {
            for (const driver of totalIndividuals) {
                let chance = Math.floor(Math.random() * totalOdds)
                    if (chance <= driver.odds) {
                        if (grid.includes(driver.driver)) {
                            continue;
                        } else {
                            grid.push(driver.driver);
                            grid2.push(driver.driverObject);
                        }
                    }   
            }
        }
        for (let i = 0; i < grid.length; i++) {
            if (grid[0] === grid2[0].name) {
                let winner = grid2[0];
                let winnerTeam = winner.team;
                winner.won();
            } else {
                grid2[i].notWon();
            }
        }
        return grid;
    }

    const season = num => {
        let winners = [];
        let podium23 = [];
        for (let i = 1; i <= num; i++) {
            let results = getPlaceWinner();
            winners.push(results[0]);
            podium23.push([results[1], results[2], results[3], results[4], results[5], results[6],  results[7], results[8], results[9]]);
        }
        return [winners, podium23];
    }

    let raceWinners = season(numOfRaces);


    const standings = resultArr => {    
    let winnersArr = resultArr[0];
    let podiumArr = resultArr[1];
    for (const winner of winnersArr) {
        for (let i = 0; i < individualStandings.length; i++) {
            let index = individualStandings[i];
            if (winner === index.name) {
                index.points += 25;
                break;
            } 
        }
    }
    for (const podium of podiumArr) {
        for (let i = 0; i < individualStandings.length; i++) {
            let index = individualStandings[i];
            if (podium.includes(index.name)) {
                if (podium[0] === index.name) {
                    index.points += 18;
                    break;
                } else if (podium[1] === index.name) {
                    index.points += 15;
                    break;
                } else if (podium[2] === index.name) {
                    index.points += 12;
                    //console.log(podium[2], index.name)
                    break;
                } else if (podium[3] === index.name) {
                    index.points += 10;
                    break;
                } else if (podium[4] === index.name) {
                    index.points += 8;
                    break;
                } else if (podium[5] === index.name) {
                    index.points += 6;
                    break;
                } else if (podium[6] === index.name) {
                    index.points += 4;
                    break;
                } else if (podium[7] === index.name) {
                    index.points += 2;
                    break;
                } else if (podium[8] === index.name) {
                    index.points += 1;
                    break;
                } else {
                    break;
                }
            } 
        }
    }
    return individualStandings;
    }

    let result = standings(raceWinners);

    let sortedWinnersArray = result.sort((a, b) => {    
        return b.points - a.points;
    });
        return sortedWinnersArray;
}



//console.log(sortedWinnersArray);

//DOM Manipulation

//Declarations
const resultsList = document.getElementById('results-list');
const theadNames = document.getElementById('thead-names');
const theadPoints = document.getElementById('thead-points');
const startBtn = document.getElementById('start-button');
const resultCard = document.getElementById('result-card');
const startCard = document.getElementById('start-card');
const backBtn = document.getElementById('back-button');
const againBtn = document.getElementById('again-button');

//Logic
let results = start(23)
const fillTableNames = () => {
    let trArray = [];
    for (const driver of results) {
        let driverTr = document.createElement('tr');
        driverTr.id = driver.name;
        driverTr.className = 'results-list-tr';
        driverTr.innerText = `${driver.name}`
        trArray.push(driverTr);
    }
    return trArray;
}

const fillTablePoints = () => {
    let trArray = [];
    for (const driver of results) {
        let driverTr = document.createElement('tr');
        driverTr.id = `${driver.name}-points`;
        driverTr.className = 'results-list-tr';
        driverTr.innerText = `${driver.points}`
        trArray.push(driverTr);
    }
    return trArray
}
const showResults = (e) => {
    e.preventDefault();
    let names = fillTableNames();
    let points = fillTablePoints();
    for (const item of names) {
        theadNames.appendChild(item);
    }
    for (const item of points) {
        theadPoints.appendChild(item);
    }
    startCard.style.display = 'none';
    resultCard.style.display = 'block';
}

const showAgain = (e) => {
    for (const driver of driverArray) {
        driver.wins = 0;
        driver.points = 0;
    }
    results = start(23)
    e.preventDefault();
    let newNames = fillTableNames();
    let newPoints = fillTablePoints(); 
    theadNames.replaceChildren();
    theadPoints.replaceChildren();
        for (let i = 0; i < newNames.length; i++) {
            theadNames.append(newNames[i]);
        }
        for (let i = 0; i < newPoints.length; i++) {
            theadPoints.append(newPoints[i]);
        }
   
    let th1 = document.createElement('th');
    th1.className = 'th';
    th1.innerText = 'Drivers';
    let nameTr = document.createElement('tr')
    nameTr.append(th1);
    let th2 = document.createElement('th2');
    th2.className = 'th';
    th2.innerText = 'Points';
    let pointsTr = document.createElement('tr')
    pointsTr.append(th2);
    theadNames.insertBefore(nameTr, theadNames.firstChild)
    theadPoints.insertBefore(pointsTr, theadPoints.firstChild)
}

const back = (e) => {
    startCard.style.display = 'block';
    resultCard.style.display = 'none';
    window.location.reload();
}
startBtn.onclick = showResults;
againBtn.onclick = showAgain;
backBtn.onclick = back;