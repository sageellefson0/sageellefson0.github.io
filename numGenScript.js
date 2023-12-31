window.onload = function () {
  confetti();

  let slots = document.getElementsByClassName("slots");
  let celebration = document.getElementsByClassName("celebration")[0];
  let numberPlaceholder = document.getElementById("numberPlaceholder");
  let restartButton = document.getElementById("restartButton");

  let howToPlay = document.getElementById("howToPlay");
  let howToPlayPopUp = document.getElementById("howToPlayPopUp");
  let closePopUpBtn = document.getElementById("closePopUpBtn");


  let happyManDivRight = document.getElementsByClassName("happyManDivRight")[0];
  let happyManDivLeft = document.getElementsByClassName("happyManDivLeft")[0];
  let buffDogeDiv = document.getElementsByClassName("buffDogeDiv")[0];
  let mobileNums2 = document.getElementsByClassName("mobileNums2")[0];
  let mobileNums1 = document.getElementsByClassName("mobileNums1")[0];



  let slotDiv = document.getElementById("slotDiv");




  let numList = [];
  let randomNumber;
  let lossVar = 0;
  let winVar = 0;
  let holdingList = [];


  let slotsNum6 = document.getElementById("slotsNum6");
  let slotsNum7 = document.getElementById("slotsNum7");
  let slotsNum8 = document.getElementById("slotsNum8");
  let slotsNum9 = document.getElementById("slotsNum9");
  let slotsNum10 = document.getElementById("slotsNum10");



  // Retrieves elements by radio button ID and assigns them to radio button variables
  const radio5Slots = document.getElementById('5slots');
  const radio10Slots = document.getElementById('10slots');


  // Retrieves elements by slot ID and assigns them to slot variables
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const slot4 = document.getElementById("slot4");
  const slot5 = document.getElementById("slot5");
  const slot6 = document.getElementById("slot6");
  const slot7 = document.getElementById("slot7");
  const slot8 = document.getElementById("slot8");
  const slot9 = document.getElementById("slot9");
  const slot10 = document.getElementById("slot10");


  // Retrieves generate button from document and assigns it to a variable
  const generateButton = document.getElementById("generateButton");


// Event listener for radio button "5 Slots" 
// Sets the numList to contain 5 zeros 
// Hides the extra slots, 6-10 and the extra slot numbers
  radio5Slots.addEventListener('change', function () {
    if (radio5Slots.checked) {
      numList = ["0", "0", "0", "0", "0"];
      hideExtraSlotsAndNums();

      restartButtonOperation()

      if (window.innerWidth <= 768) {
        slotDiv.style.top = "71%";
      }

      if (window.innerWidth <= 768 && window.innerWidth <= 1024) {
        mobileNums1.style.top = "71%;"
        mobileNums1.style.left = "50%;"
      }

      mobileNums2.style.display = "none";
    }
  });

// Event listener for radio button "10 Slots" 
// Sets the numList to contain 10 zeros 
// Displays the slots 6 - 10 and adjusts for mobile view as needed
  radio10Slots.addEventListener('change', function () {
    if (radio10Slots.checked) {
      numList = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
      slotDiv.style.top = "75%";

      // Check if the screen width is less than or equal to 768 pixels (mobile)
      if (window.innerWidth <= 768) {
        slotsNum6.style.display = "none";
        slotsNum7.style.display = "none";
        slotsNum8.style.display = "none";
        slotsNum9.style.display = "none";
        slotsNum10.style.display = "none";

        slot6.style.display = "initial";
        slot7.style.display = "initial";
        slot8.style.display = "initial";
        slot9.style.display = "initial";
        slot10.style.display = "initial";

        mobileNums2.style.display = "flex";


      } else {
        // If not on mobile, show slots 6-10
        slot6.style.display = "initial";
        slot7.style.display = "initial";
        slot8.style.display = "initial";
        slot9.style.display = "initial";
        slot10.style.display = "initial";

        slotsNum6.style.display = "inline-block";
        slotsNum7.style.display = "inline-block";
        slotsNum8.style.display = "inline-block";
        slotsNum9.style.display = "inline-block";
        slotsNum10.style.display = "inline-block";
      }

      restartButtonOperation()
    }
  });


// Sets a new event "change" on the 10 Slots radio button, as it loads selected by default
// Keep this here
  radio10Slots.dispatchEvent(new Event('change'));


// Hides the extra slots and slot numbering 
  function hideExtraSlotsAndNums() {
    slot6.style.display = "none";
    slot7.style.display = "none";
    slot8.style.display = "none";
    slot9.style.display = "none";
    slot10.style.display = "none";

    slotsNum6.style.display = "none";
    slotsNum7.style.display = "none";
    slotsNum8.style.display = "none";
    slotsNum9.style.display = "none";
    slotsNum10.style.display = "none";

  }

  restartButton.disabled = true;



  // sets the slots to disabled on load - doesnt enable until generate start number is clicked
  disableAllSlots();

  // restart button disabled on launch as it tracks ls


  // Handle the click event for the generateButton

  generateButton.addEventListener("click", function () {
    generateRandomNumber();
    generateButton.disabled = true;
    restartButton.disabled = false;
    enableAllSlots();

    radio10Slots.disabled = true;
    radio5Slots.disabled = true;
  });

  closePopUpBtn.addEventListener("click", function () {
    howToPlayPopUp.style.display = "none";


  });


  // Handle the click event for the restartButton
  restartButton.addEventListener("click", function () {

    if (numberPlaceholder.innerText === "You have won!") {
      restartButton.disabled = true;
    }
    else {
      lossVar++;
      let statsTextLoss = document.getElementById("statsTextLoss");
      statsTextLoss.innerText = "Losses: " + lossVar;
      restartButton.disabled = true;
      celebration.style.display = "none";
      canvas.style.display = "none";
    }

    restartButtonOperation();

    celebration.style.display = "none";
    canvas.style.display = "none";



  });



  // restartButton function
  function restartButtonOperation() {
    numberPlaceholder.innerHTML = "&nbsp;";

    if (radio5Slots.checked) {
      numList = ["0", "0", "0", "0", "0"];
      hideExtraSlotsAndNums();
    }
    else if (radio10Slots.checked) {
      numList = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    }

    radio10Slots.disabled = false;
    radio5Slots.disabled = false;

    holdingList = [];


    // Reset the text content of each slot

    slot1.innerText = "";
    slot2.innerText = "";
    slot3.innerText = "";
    slot4.innerText = "";
    slot5.innerText = "";
    slot6.innerText = "";
    slot7.innerText = "";
    slot8.innerText = "";
    slot9.innerText = "";
    slot10.innerText = "";

    for (let i = 0; i < slots.length; i++) {
      slots[i].style.border = "solid 2px #333232";
    }
    // disable all slots on load, will enable when generate button is clicked
    disableAllSlots();

    generateButton.disabled = false;
  }

// Enables all slots 
  function enableAllSlots() {
    slot1.disabled = false;
    slot2.disabled = false;
    slot3.disabled = false;
    slot4.disabled = false;
    slot5.disabled = false;
    slot6.disabled = false;
    slot7.disabled = false;
    slot8.disabled = false;
    slot9.disabled = false;
    slot10.disabled = false;
  }

// Disables all slots 
  function disableAllSlots() {
    slot1.disabled = true;
    slot2.disabled = true;
    slot3.disabled = true;
    slot4.disabled = true;
    slot5.disabled = true;
    slot6.disabled = true;
    slot7.disabled = true;
    slot8.disabled = true;
    slot9.disabled = true;
    slot10.disabled = true;
  }


// Generates a random number between 1 and 1000, uses a holding list to check for duplicates ensuring every number is original. 
// Checks radio button selection determine holding list size. 
  function generateRandomNumber() {

    if (radio5Slots.checked) {
      if (holdingList.length === 5) {
        console.log("Holding list is full. No more numbers will be generated.");
        return;
      }
    } else if (radio10Slots.checked) {
      if (holdingList.length === 10) {
        console.log("Holding list is full. No more numbers will be generated.");
        return;
      }
    }

    let newRandomNumber = Math.floor(Math.random() * 1000) + 1;

    if (holdingList.includes(newRandomNumber)) {
      console.log("Duplicate number, rerunning function");
      generateRandomNumber();

    }
    else {
      randomNumber = newRandomNumber;
      holdingList.push(randomNumber);
      console.log(holdingList);
      numberPlaceholder.innerText = String(randomNumber);
    }
  }


// Event listener for the how to play button
  howToPlay.addEventListener("click", openPopUp);

// Function to display the how to play div 
  function openPopUp() {
    howToPlayPopUp.style.display = "block";
  }


//////////// Event listener for slots 1 - 10. //////////////
// Generates a new number when a slot is clicked, then sets the placeholder text to the next number to be placed.
// Calls the orderCheck() function to ensure the numbers are in order after every placement. 
// Adds the number being set to the slot to numList to keep track of the order. 
  slot1.addEventListener("click", setSlot1);

  function setSlot1() {
    slot1.innerText = numberPlaceholder.innerText;
    slot1.disabled = true;
    slot1.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(0, 1, slot1.innerText)
    console.log(numList);
    orderCheck();
  }

  slot2.addEventListener("click", setSlot2);

  function setSlot2() {
    slot2.innerText = numberPlaceholder.innerText;
    slot2.disabled = true;
    slot2.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(1, 1, slot2.innerText)
    console.log(numList);
    orderCheck();
  }

  slot3.addEventListener("click", setSlot3);

  function setSlot3() {
    slot3.innerText = numberPlaceholder.innerText;
    slot3.disabled = true;
    slot3.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(2, 1, slot3.innerText)
    console.log(numList);
    orderCheck();
  }

  slot4.addEventListener("click", setSlot4);

  function setSlot4() {
    slot4.innerText = numberPlaceholder.innerText;
    slot4.disabled = true;
    slot4.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(3, 1, slot4.innerText)
    console.log(numList);
    orderCheck();
  }

  slot5.addEventListener("click", setSlot5);
  function setSlot5() {
    slot5.innerText = numberPlaceholder.innerText;
    slot5.disabled = true;
    slot5.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(4, 1, slot5.innerText)
    console.log(numList);
    orderCheck();
  }

  slot6.addEventListener("click", setSlot6);
  function setSlot6() {
    slot6.innerText = numberPlaceholder.innerText;
    slot6.disabled = true;
    slot6.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(5, 1, slot6.innerText)
    console.log(numList);
    orderCheck();
  }

  slot7.addEventListener("click", setSlot7);
  function setSlot7() {
    slot7.innerText = numberPlaceholder.innerText;
    slot7.disabled = true;
    slot7.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(6, 1, slot7.innerText)
    console.log(numList);
    orderCheck();
  }


  slot8.addEventListener("click", setSlot8);
  function setSlot8() {
    slot8.innerText = numberPlaceholder.innerText;
    slot8.disabled = true;
    slot8.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(7, 1, slot8.innerText)
    console.log(numList);
    orderCheck();
  }

  slot9.addEventListener("click", setSlot9);
  function setSlot9() {
    slot9.innerText = numberPlaceholder.innerText;
    slot9.disabled = true;
    slot9.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(8, 1, slot9.innerText)
    console.log(numList);
    orderCheck();
  }


  slot10.addEventListener("click", setSlot10);
  function setSlot10() {
    slot10.innerText = numberPlaceholder.innerText;
    slot10.disabled = true;
    slot10.style.border = "solid 2px #007991";
    generateRandomNumber();
    numList.splice(9, 1, slot10.innerText)
    console.log(numList);
    orderCheck();
  }


// Checks the numList to ensure the list is in order and filters the numbers, excluding 0's, which the list is set to contain by default (restart or intialization)
  function isInNumericalOrderIgnoreZeros(list) {
    // Filter out the zeros
    const filteredList = list.filter(num => num !== "0");

    // Check if the filtered list is in any sequential order
    for (let i = 0; i < filteredList.length - 1; i++) {
      const currentNum = parseInt(filteredList[i]);
      const nextNum = parseInt(filteredList[i + 1]);

      // Check if the next number is greater than the current one
      if (nextNum <= currentNum) {
        return false;
      }
    }

    return true;
  }


// Function to check the order of numList
// Displays the win or loss message depending on the specified condition of the list
// Displays the celebration elements depending on the placeholder text and conditions
  function orderCheck() {
    if (isInNumericalOrderIgnoreZeros(numList)) {
      console.log("List is in order, ignoring 0s.");

      if (numList.every(item => item !== "0")) {
        numberPlaceholder.innerText = "You have won!";
        winVar++;
        statsTextWin.innerText = "Wins: " + winVar;
        celebration.style.display = "block";
        canvas.style.display = "block";

        if (window.innerWidth <= 768) {
          happyManDivRight.style.display = "none";
          happyManDivLeft.style.display = "none";
          canvas.style.display = "block";
        }

        if (radio5Slots.checked) {
          buffDogeDiv.style.display = "none";
        }

        if (radio10Slots.checked) {
          buffDogeDiv.style.display = "initial";
        }

        radio10Slots.disabled = true;
        radio5Slots.disabled = true;
      }
    } else {
      numberPlaceholder.innerText = "You have lost.";

      disableButtons();
    }
  }


// Disables all the slots and the generate button from being pressed
// Calls function disableAllSlots()
  function disableButtons() {
    disableAllSlots();
    generateButton.disabled = true;
  }


// Confetti code below, uses canvas
// Credit to Smeegs for this design, which was shared here: https://jsfiddle.net/Javalsu/vxP5q/743/
  function confetti() {
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 200; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 15 + 1, //radius
        d: Math.random() * mp, //density
        color: "rgba(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", 0.8)",
        tilt: Math.floor(Math.random() * 5) - 5
      });
    }

    //Lets draw the flakes
    function draw() {
      ctx.clearRect(0, 0, W, H);



      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color; // Green path
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.tilt + p.r / 2, p.y + p.tilt);
        ctx.stroke(); // Draw it
      }

      update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;

    function update() {
      angle += 0.01;
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) //66.67% of the flakes
          {
            particles[i] = {
              x: Math.random() * W,
              y: -10,
              r: p.r,
              d: p.d,
              color: p.color,
              tilt: p.tilt
            };
          } else {
            //If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              //Enter from the left
              particles[i] = {
                x: -5,
                y: Math.random() * H,
                r: p.r,
                d: p.d,
                color: p.color,
                tilt: p.tilt
              };
            } else {
              //Enter from the right
              particles[i] = {
                x: W + 5,
                y: Math.random() * H,
                r: p.r,
                d: p.d,
                color: p.color,
                tilt: p.tilt
              };
            }
          }
        }
      }
    }

    //animation loop
    setInterval(draw, 20);
  }

}


