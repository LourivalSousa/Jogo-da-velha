const game =  {
    table: Array(9),
    turn: 1,
    backupTurn: 0,
    winner: undefined, 
}

resetTable();

const mainGameFunction = () =>{ 
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('click',()=>{
            const index = square.getAttribute("data-square");
            if(game.winner===undefined && game.turn<10){
                insertTable(index,square);
                getWinner(game);
                game.backupTurn = game.turn;
                game.turn++;
            }
        });
    })
}

document.addEventListener('DOMContentLoaded',mainGameFunction);

function insertTable(index,square){
    if(game.table[index]===''){
        game.table[index]= getPlayer();
        addSymbol(square);
    }else{
        game.turn = game.backupTurn;
    }
}

function resetTable(){
    let i;
    for(i=0;i<9;i++){
       game.table[i] = '';
    }
    resetSquares();
    game.winner=undefined;
    game.turn=1;
}

function getPlayer(){
    if(game.turn %2 == 0){
       return 'O';
    }else{
       return 'X';
    }
}

function getWinner({turn}){
    if(game.winner===undefined){
        game.winner = calcularVitoria(game); 
    }
    if(turn>8 && game.winner===undefined) {
        console.log("Empate");
        increaseCounter('draw');
        setTimeout(resetTable,1000);
    }else if(game.winner!==undefined){
        console.log("Vencedor é: "+game.winner);
        increaseCounter(game.winner);
        setTimeout(resetTable,1000);
    }
    
}


function addSymbol(square){
    square.innerHTML = `${getPlayer()}`;
}

function resetSquares(){
    const squares = document.querySelectorAll('.square');
    squares.forEach(square=>{
        square.innerHTML="";
    })
}

function calcularVitoria({table}){
    const player = getPlayer();
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let i;
    for(i=0;i<winConditions.length;i++){
        const condition = winConditions[i];
        const firstCondition = condition[0];
        const secondCondition = condition[1];
        const thirdCondition = condition[2];
        if(table[firstCondition] === player && table[secondCondition] === player && table[thirdCondition] === player ){ 
            return player;
        }
    }
    return undefined;
}


function increaseCounter(selector){
    const element = document.getElementsByClassName(selector);
    const number = parseInt(1) + parseInt(element[0].innerHTML);
    element[0].innerHTML = number;
}
