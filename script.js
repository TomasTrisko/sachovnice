(function() {
    const ROWS = 10;
    const COLS = 10;
    const board = document.getElementById('board');
    const resetBtn = document.getElementById('resetBtn');
    const colorPicker = document.getElementById('colorPicker');
  
    let isMouseDown = false;
  
    function createBoard() {
      board.innerHTML = '';
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          const isLight = ((r + c) % 2 === 0);
          cell.classList.add(isLight ? 'light' : 'dark');
          cell.dataset.originalClass = isLight ? 'light' : 'dark';
  
          // kliknutí myši
          cell.addEventListener('mousedown', (e) => {
            e.preventDefault();
            toggleCell(cell);
            isMouseDown = true;
          });
  
          // držení myši
          cell.addEventListener('mouseenter', () => {
            if (isMouseDown) toggleCell(cell);
          });
  
          board.appendChild(cell);
        }
      }
  
      // zrušení stavu držení myši po puštění
      document.body.addEventListener('mouseup', () => {
        isMouseDown = false;
      });
    }
  
    function toggleCell(cell) {
      const isSelected = cell.classList.contains('selected');
      if (!isSelected) {
        const color = colorPicker.value || '#ff4d4d';
        cell.style.backgroundColor = color;
        cell.classList.add('selected');
      } else {
        cell.style.backgroundColor = '';
        cell.classList.remove('selected');
        if (cell.getAttribute('style') === '') cell.removeAttribute('style');
      }
    }
  
    function resetBoard() {
      const cells = board.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.classList.remove('selected');
        cell.style.backgroundColor = '';
        const orig = cell.dataset.originalClass || 'light';
        cell.classList.remove('light', 'dark');
        cell.classList.add(orig);
      });
    }
  
    resetBtn.addEventListener('click', resetBoard);
    createBoard();
  })();
  