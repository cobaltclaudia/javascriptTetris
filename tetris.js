document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBin = document.queryCommandIndeterm('#start-button');
    const width = 10;

    console.log(squares);

    // the tetrominoes
    const tetrominoL = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    const tetrominoZ = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]
    const tetrominoT = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]
    const tetrominoO = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]
    const tetrominoI = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTetrominoes = [tetrominoL, tetrominoZ, tetrominoT, tetrominoO, tetrominoI];

    let currentPosition = 4;
    let currentRotation = 0;

    // randomly select a tetromino with first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length);
    console.log(random);
    console.log(currentRotation);
    let current = theTetrominoes[random][currentRotation];

    console.log(theTetrominoes[0][0]);

    // draw the tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    // undraw the tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    // make the tetromino move down every second
    timerId = setInterval(moveDown, 1000);

    // assign function to keycodes
    function control(e){
        if(e.keyCode === 37){
            moveLeft();
        }else if(e.keyCode === 38){
            rotate();
        }else if (e.keyCode === 39){
            moveRight();
        }else if (e.keyCode === 40){
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start a new tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();

        }
    }

    // moveLeft
    function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) currentPosition-=1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition +=1;
        }
        draw();
    }


    // moveRight
    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === -1);

        if(!isAtRightEdge) currentPosition+=1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1;
        }
        draw();
    }


    //rotate
    function rotate(){
        undraw();
        currentRotation++;
        if(currentRotation === current.length){
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }



})// addEventListener brackets