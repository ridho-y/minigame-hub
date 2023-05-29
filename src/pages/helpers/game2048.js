const ROW_LENGTH = 4;
const COL_LENGTH = 4;

let total = 0

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.ceil(max));
}

export function startBoard(grid) {
    grid = spawnRandom(grid);
    grid = spawnRandom(grid);
    return grid;
}

export function moveUp(grid) {
    grid = shift('up', grid);
    grid = joinUp(grid);
    grid = shift('up', grid);
    grid = spawnRandom(grid);
    return grid;
}

export function moveDown(grid) {
    grid = shift('down', grid);
    grid = joinDown(grid);
    grid = shift('down', grid);
    grid = spawnRandom(grid);
    
    return grid;
}

export function moveRight(grid) {
    grid = shift('right', grid);
    grid = joinRight(grid);
    grid = shift('right', grid);
    grid = spawnRandom(grid);
    return grid;
}

export function moveLeft(grid) {
    grid = shift('left', grid);
    grid = joinLeft(grid);
    grid = shift('left', grid);
    grid = spawnRandom(grid);
    return grid;
}

export function spawnRandom(grid) {
    // Select a position where grid value is 0
    let x = getRandomInt(4);
    let y = getRandomInt(4);
    while (grid[x][y] !== 0) {
        x = getRandomInt(4);
        y = getRandomInt(4);
    }
    
    const newGrid = JSON.parse(JSON.stringify(grid))
    newGrid[x][y] = [2,4][getRandomInt(2)];
    return newGrid;
}

export function getScore() {
    return total
}

export function setScore2(s) {
    total = s
}


const shift = (direction, grid) => {
    if (direction === 'up' || direction === 'down') {
        for (let col = 0; col < COL_LENGTH; col++) {
            let vals = [];
            for (let row = 0; row < ROW_LENGTH; row++) {
                if (grid[row][col] !== 0) {
                    vals.push(grid[row][col]);
                }
            }
    
            while (vals.length !== 4) {
                if (direction === 'up') {
                    vals.push(0);
                } else if (direction === 'down') {
                    vals.unshift(0);
                }
            }
    
            for (let row = 0; row < ROW_LENGTH; row++) {
                grid[row][col] = vals[row];
            }
        }
    } else {
        for (let row = 0; row < ROW_LENGTH; row++) {
            let vals = grid[row];
            vals = vals.filter((i) => i !== 0)

            while (vals.length !== 4) {
                if (direction === 'right') {
                    vals.unshift(0);
                } else if (direction === 'left') {
                    vals.push(0);
                }
            }

            for (let col = 0; col < COL_LENGTH; col++) {
                grid[row][col] = vals[col];
            }

        }
        
    }
    return grid;
}

const joinUp = (grid) => {
    for (let col = 0; col < COL_LENGTH; col++) {
        let start = 0;
        let end = 1;
        while (end < grid.length) {
            if (grid[start][col] === grid[end][col]) {
                grid[start][col] *= 2;
                total += grid[start][col]
                grid[end][col] = 0;
            }
            start++;
            end++;
        }
    }
    return grid;
}

const joinDown = (grid) => {
    for (let col = 0; col < COL_LENGTH; col++) {
        let start = COL_LENGTH - 1;
        let end = COL_LENGTH - 2;
        while (end >= 0) {
            if (grid[start][col] === grid[end][col]) {
                grid[start][col] *= 2;
                total += grid[start][col]
                grid[end][col] = 0;
            }
            start--;
            end--;
        }
    }
    return grid;
}

const joinRight = (grid) => {
    for (let row = 0; row < ROW_LENGTH; row++) {
        let start = 0;
        let end = 1;
        while (end < grid.length) {
            if (grid[row][start] === grid[row][end]) {
                grid[row][start] *= 2;
                total += grid[row][start]
                grid[row][end] = 0;
            }
            start++;
            end++;
        }
    }
    return grid;
}

const joinLeft = (grid) => {
    for (let row = ROW_LENGTH - 1; row > 0; row--) {
        let start = ROW_LENGTH - 1;
        let end = ROW_LENGTH - 2;
        while (end >= 0) {
            if (grid[row][start] === grid[row][end]) {
                grid[row][start] *= 2;
                total += grid[row][start]
                grid[row][end] = 0;
            }
            start--;
            end--;
        }
    }
    return grid;
}

