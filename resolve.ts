/**
 Do not return anything, modify board in-place instead.
 */

function getEmptyCounts(board: string[][]): number {
    return board.reduce(
        (acc: number, row: string[]) => {
            return acc + row.filter(cell => cell === '.' || cell.length > 1).length;
        },
        0
    );
}

function searchInLine(board: string[][], x: number, y: number): void {
    for (let col = 0; col < 9; col++) {
        const numbersInRow = board[y].filter((num: string, colIndex: number) => colIndex !== x && num !== '.' && num.length === 1);
        for (let numberToRemove of numbersInRow) {
            board[y][x] = board[y][x].replace(numberToRemove, '');
        }
    }
}

function searchInColumn(board: string[][], x: number, y: number): void {
    for (let row = 0; row < 9; row++) {
        const numbersInCol = board.map(line => line[x]).filter((num, rowIndex) => rowIndex !== y && num !== '.' && num.length === 1);
        for (let numberToRemove of numbersInCol) {
            board[y][x] = board[y][x].replace(numberToRemove, '');
        }
    }
}

function searchInSquare(board: string[][], x: number, y: number): void {
    const minY = Math.floor(y / 3) * 3;
    const maxY = minY + 3;
    const minX = Math.floor(x / 3) * 3;
    const maxX = minX + 3
    const numbersInSquare = [];
    for (let sqY = minY; sqY < maxY; sqY++) {
        for (let sqX = minX; sqX < maxX; sqX++) {
            if (sqY !== y && sqX !== x && board[sqY][sqX].length === 1 && board[sqY][sqX] !== '.') 
                numbersInSquare.push(board[sqY][sqX]);
        }
    }
    for (let numberToRemove of numbersInSquare) {
        board[y][x] = board[y][x].replace(numberToRemove, '');
    }
}

function checkTwoNumbersInOneLine(board: string[][], x: number, y: number): void {
    type TNumbersCounts = {count: number, coords: Array<{x: number, y: number}>};
    const numbersCount: Record<string, TNumbersCounts> = {};
    for (let i = 0; i < 9; i++) {
        for (let num of board[y][i]) {
            if (!numbersCount[num]) numbersCount[num] = {count: 0, coords: []};
            numbersCount[num].count++;
            numbersCount[num].coords.push({x, y});
        }
    }
    for (let [num, data] of Object.entries(numbersCount).filter(([, {count}]) => count === 2)) {
        
    }
}

function solveSudoku(board: string[][]): void {
    let emptyCounts = getEmptyCounts(board);
    while (emptyCounts > 0) {
        debugger;
        console.log({emptyCounts});
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (board[y][x] === '.') board[y][x] = '123456789';
                if (board[y][x].length > 1) {
                    searchInLine(board, x, y);
                    searchInColumn(board, x, y);
                    searchInSquare(board, x, y);
                }
            }
        }
        const prevEmptyCounts = emptyCounts;
        emptyCounts = getEmptyCounts(board);
        console.log('after', {emptyCounts});
        if (emptyCounts === prevEmptyCounts) break;
    }
}

let board =
[[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]

console.table(board);
console.log(solveSudoku(board));
console.table(board);
