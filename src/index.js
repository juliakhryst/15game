import './index.css';

const fifteen = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null]
  ];
  
  const getXY = (source) => {
    const y = source.findIndex(arr => arr.includes(null));
    const x = source[y].findIndex(x => x === null);
    return {
      y,
      x
    };
  };
  
  const shuffleState = (state) => {
    const shuffleArr = (inputArr) => {
      const arr = [...inputArr];
      for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
      return arr;
    }
    const flattenArr = state.reduce((acc, val) => {
      return [...acc, ...val]
    }, []);
    const shuffledArr = shuffleArr(flattenArr);
    return [
      shuffledArr.slice(0, 4),
      shuffledArr.slice(4, 8),
      shuffledArr.slice(8, 12),
      shuffledArr.slice(12, 16),
    ]
  };
  
  const renderRow = (arr) =>
    `<div class='square'>${arr.join('</div><div class=\'square\'>')}</div>`;
  
  const renderRows = (arr) => {
    return arr.reduce((acc, current) => {
      return acc + renderRow(current);
    }, '');
  };
  
  //
  
  const renderGame = (shuffledArray, domNode = document.getElementById('app')) => {
    const rows = renderRows(shuffledArray).replace(
      '<div class=\'square\'></div>',
      '<div class=\'square empty\'></div>'
    );
    domNode.innerHTML = rows;
  };
  
  const areSame = (matrix1, maxtrix2) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (matrix1[i][j] != maxtrix2[i][j]) {
          return false;
        }
      }
    }
  
    return true;
  };
  
  const wonState = (currentState) => {
  
    if (areSame(fifteen, currentState)) {
      alert('Congratulations! You won!');
      state = shuffleState(fifteen);
      renderGame(state);
    }
  };
  
  let state = shuffleState(fifteen);
  renderGame(state);
  
  document.addEventListener('keydown', e => {
    const xyOfEmptyCell = getXY(state);
    let nextY;
    let nextX;
    switch (e.keyCode) {
      case 37:
        // left arrow
        if (xyOfEmptyCell.x === 3) return;
        nextY = xyOfEmptyCell.y;
        nextX = xyOfEmptyCell.x + 1;
        break;
  
      case 38:
        // up arrow
        if (xyOfEmptyCell.y === 3) return;
        nextY = xyOfEmptyCell.y + 1;
        nextX = xyOfEmptyCell.x;
        break;
  
      case 39:
        // right arrow
        if (xyOfEmptyCell.x === 0) return;
        nextY = xyOfEmptyCell.y;
        nextX = xyOfEmptyCell.x - 1;
        break;
  
      case 40:
        // down arrow
        if (xyOfEmptyCell.y === 0) return;
        nextY = xyOfEmptyCell.y - 1;
        nextX = xyOfEmptyCell.x;
        break;
  
      default:
        break;
    }
  
    state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
    state[nextY][nextX] = null;
  
    renderGame(state);
    wonState(state);
  
  });