//This variable keeps track of whose turn it is.
let activePlayer = 'X';
//This array stores an array of moves. We use this to determinate win conditions.
let selectSquares = [];

//This function is for placing an x or o in a square.
function placeXOrO(squareNumber) {
        //this function parses the selectedSquares array to serach for win condition
    //drwaLine() function is called to draw a line on the screen if the condition is met
    function checkWinConditions() {
        // X 0, 1, 2 conditon.
       if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
       // X 3, 4 5 condition 
       else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 404, 558, 304) }
       // X 6, 7, 8 CONDITION
       else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
       //X 0, 3, 6 CONDITION
       else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
       // X 1, 4, 7 CONDITION
       else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
       // X 2, 5, 8 CONDITION
       else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
       // x 6, 4, 2 condition
       else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
       //X 0, 4, 8 CONDITION
       else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 520) }
       // o 0, 1, 2 CONDITION
       else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(50, 100, 558, 100) }
       //O 3, 4, 5 condition
       else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304) }
       //O 6, 7, 8 condition
       else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 508) }
       // O 0, 3, 6 CONDITION
       else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558) }
       // O 1, 4, 7 CONDITION
       else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(304, 50, 304, 558) }
       // O 2, 5, 8 CONDITION
       else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine(508, 50, 508, 558) }
       // O 6, 4, 2 CONDTION
       else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90) }
       // O 0, 4, 8 CONDTION
       else if (arrayIncludes('0O', '4O', '80')) {drawWinLine(100, 100, 520, 520) }
       //THIS CONDITION CHECKS FOR THE TIE. IF NONE OF THE ABOVE CONDITIONS ARE MET AND 
       //9 SQUARES ARE SELECTED THE CODE EXECUTES
       else if (selectedSquares.length >= 9) {
           //this function plays the tie game sound
           Audio('./media/tie.mp3');
           //this function sets a.3 seconds timer before the resetgame is called
           setTimeout(function () { resetGame(); }, 500);
       }

       //this function checks if an array includes 3 strings. it is used to check for
       //each win condition
       function arrayIncludes(squareA, squareB, squareC) {
           //THSES 3 VARIABLES WILL BE USED TO CHECK FOR 3 IN A ROW
           const a = selectedSquares.includes(squareA);
           const b = selectedSquares.includes(squareB);
           const c = selectedSquares.includes(squareC);
           //IF THE 3 VARIABLES WE PASS ARE ALL INLUDED IN OUR ARRAY THEN
           //TRUE IS RETURNED AND OUR ELSE IF CONDTION EXECUTES THE DRAWLINE() FUNCTION
           if (a === true && b === true && c === true) {return true; }
        }
    }
    //This condition ensures a square hasnt been selected already
    //The .some() method is used to check each element of the selectSquare array to see if it contains the square number clicked on.
    if (!selectSquares.some(element => element.includes(squareNumber))) {
        //this variable retrieves the HTML element id that was clicked
        let select = ducument.getElementById(squareNumber);
        //this condition chcecks whos turn it is
        if (activePlayer === 'X') {
            //IF activeplayer is equal to 'x', the x.png is placed in html
            select.style.backgroundImage = 'url("images/x.png")';
            //active player may only be 'x' or 'o' so, if not x it must be o
        } else {
            //if active player is equal to o, the o.png is placed in html
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squarenumber and activeplayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a funtion to check for any win condition
        checkWinConditions();
        //this condition is for checking the active player
        if (activePlayer === 'X') {
            //if active player is x chenge it o
            activePlayer = 'O';
            //IF active player is anything other than x
        } else {
            //change the activeplayer to x
            activePlayer = 'X';
        }


        //THIS funtion playes placement sound
        Audio('./media/place.mp3');
        //this condition checks to see if it is the computers turn
        if (activePlayer === 'O') {
            //THIS function disables clicking for computers turn
            disableClick();
            //this funtion waits 1 second before the computer places an image and enable click
            setTimeout(function () { computersTurn(); }, 1000);
        }
        //returning true is needed for our computersturn() function to work
        return true;
    }
    //this function results in a random square being selected by the computer
    function computersTurn() {
        //this boolean is needed for our while loop
        let success = false;
        //this variable stores a random number 0-8
        let pickASquare;
        //this condition allows our while loop to keep trying is a square is selected already
        while (!success) {
            //a random number between 0-8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //if the random number evaluated return true, the square hasnt been selected yet
            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success = true;
            };
        }
    }

    //this function makes our body element temporarily unclickable
    function disableClick() {
        //this makes our body unclickable
        body.style.pointerEvents = 'none';
        //this makes our body clickable again after 1 sec
        setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
    }

    //this function takes a string parametr of the path you set earlier for
    //placement sound('./media/place.mp3')
    function Audio(audioURL) {
        // WE CREATE A NEW AUDIO OBJECT AND WE PASS THE PATH AS A PARAMETR 
        let audio = new audio(audioURL);
        //play method plays our audio sound
        audio.play();
    }

    //this function utilizes html canvas to draw win lines 
    function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
        //THIS LINE ACCESS OUR HTML CANVAS ELEMENT
        const canvas = document.getElementById('win-lines');
        //this line gives us the access to methods and properties to use on canvas 
        const c = canvas.getContext('2d');
        //this line indicates where the start of lines x axis is
        let x1 = coordX1,
            //this line indicates where the start of lines y axis is
            y1 = coordY1,
            //this line indicates where the end of lines x axis is 
            x2 = coordX2,
            // this line indicate where the end of line y axis is
            y2 = coordY2,
            //this variable stores temporary x axis data we update in our animation loop
            x = x1,
            //this variable stores temporary y axis data we update in our animation loop
            y = y1;

        //this function interacts with the canvas
        function animateLineDrawing() {
            //this variables creates a loop
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            //this method clears content from the last loop iteration
            c.clearRect(0, 0, 608, 608);
            //this method start a new path
            c.beginPath(),
            //this method moves us to a starting point in our line 
            c.moveTo(x1, y1);
            //this method indicates the end point in our line
            c.lineTo(x, y);
            //this methos sets the width of our line
            c.lineWidth = 10;
            //this method sets the color of line
            c.strokeStyle = 'rgba(70, 255, 33, .8)';
            //this method draws everything we laid out above
            c.stroke();
            //this condition checks if we have reached the endpoints
            if (x1 <= x2 && y1 <= y2) {
                //this condition adds 10 to the previous and x endpoint 
                if (x < x2) {x += 10; }
                //this condition adds 10 to the prevoius end y endpoint
                if (y < y2) { y += 10; }
                //this condition is similiar to the above
                //this is necessary for the 6, 4, 2 win condition
                if (x1 <= x2 && y1 >= y2) { cancelAnimationFrame(animationLoop); }
                }
                // this condition is similar to the one above 
                //this is neccessary for the 6, 4, 2 win conditions
                if (x1 <= x2 && y1 >= y2) {
                    if (x < x2) { x += 10; }
                    if (y > y2) { y -= 10; }
                    if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
                }
            }

            //this function clears our canvas after our win line is drawn
            function clear() {
                //this line starts our animation loop
                const animationLoop = requestAnimationFrame(clear);
                //this line clears our canvas.
                c.clearRect(0, 0, 608, 608);
                //this line stops our animation loop.
                cancelAnimationFrame(animationLoop);
            }
            //this line disallows clicking while the win sound is playing 
            disableClick();
            //this line plays the win sound
            audio('./media/winGame.mp3');
            //this line calls our main animation loop
            animateLineDrawing();
            //this line waits 1 second, then, clear canvas, reset game, allows clicking again
            setTimeout(function () { clear(); resetGame(); }, 1000);
        }

        //this function resets the game in the event of tie or win
        function resetGame() {
            //this for loop iterates through each html square element
            for (let i = 0; i < 9; i++) {
                //this variable gets the html element i.
                let square = document.getElementById(string(i));
                //this removes our elements backgroundimage
                square.style.backgroundImage = '';
            }
            // this resets our array so it is empty and we can start over
            selectedSquares = [];
        }
    }
