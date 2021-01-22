

const game = (function(){
    const xClass = 'x';
    const circleClass = 'circle';
    let circleTurn;
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const winnerDisplay = document.getElementById('winner-display');

    const winninPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const _handleClicks = (e)=>{
        const cell = e.target
        const currentClass = circleTurn ? circleClass : xClass;
        _setMark(cell,currentClass);
        if(_checkWin(currentClass)){
            winnerDisplay.innerText = `${currentClass == circleClass ? 'O'
        : 'X'} wins`;
            _stopGame(false)
        }else if(_checkDraw()){
            _stopGame(true)
        }else{
            _switchTurns()
        }
        
    }

    const _checkDraw = ()=>{
        return [...cells].every(cell=>{
            return cell.classList.contains(xClass) ||
            cell.classList.contains(circleClass);
        })
    }

    const _stopGame = (isdraw)=>{
        cells.forEach(cell=>{
            cell.removeEventListener('click', _handleClicks,{once : true})
        })

        if(isdraw){
            winnerDisplay.innerText = "It's a Draw!";
        }
    }
    
    const _checkWin = (currentClass)=>{
        return winninPositions.some(combination=>{
            return combination.every(index=>{
                return cells[index].classList.contains(currentClass);
            })
        })
    }

    const _setMark = (target,mark)=>{
        target.classList.add(mark);
    }

    const startGame = ()=>{
        winnerDisplay.innerText = '';
        cells.forEach(cell=>{
            cell.classList.remove(xClass);
            cell.classList.remove(circleClass);
            cell.addEventListener('click', _handleClicks,{once : true})
        })
    }

    const _switchTurns = ()=>{
        circleTurn = !circleTurn;
    }
    
    return{
        startGame
    }
})();

game.startGame()

document.getElementById('restart').addEventListener('click',game.startGame)