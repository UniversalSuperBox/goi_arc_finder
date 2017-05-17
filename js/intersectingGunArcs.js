function isInteger(numToCheck) {
  // Returns true if the input is an integer. Returns false otherwise.
  // This function exists because Number.isInteger isn't implemented in IE.
  return (numToCheck % 1 === 0);
}

// http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

function getInputIntegerInRange(strMessage, numMinimum, numMaximum) {
  /* Prompts the user for a number between numMinimum and numMaximum with
      strMessage. Returns a number. */
  
  var boolInputCorrect = false;
  var numInput;
  
  while (!(boolInputCorrect)) {
    numInput = Number(prompt(strMessage + " Enter a number between " +
                             numMinimum + " and " + numMaximum));
    if (!(isNaN(numInput)) && 
         (numInput >= numMinimum) &&
         (numInput <= numMaximum) &&
         (isInteger(numInput))) {
      boolInputCorrect = true;
    } else {
      alert("Please enter a whole number between " + numMinimum + " and " + numMaximum);
    }
  }
  
  return numInput;
}

function getLightGun(numLookupGun) {
  /* Returns an array with the following information:
   ["Gun Name", Arc Degrees, Range in meters]
  Coincidentally, you define a new gun by making a subarray in arrGuns with
   its information */
   
  var arrGuns = [ 
    [], 
    ["Artemis Light Rocket Launcher", 65, 1334],
    ["Barking Dog Light Carronade", 55, 325],
    ["Banshee Light Rocket Carousel", 60, 1170],
    ["Dragon Tongue Light Flamethrower", 60, 200],
    ["Echidna Light Flak Cannon", 50, 999],
    ["Hades Light Cannon", 35, 1400],
    ["Javelin Light Harpoon Gun", 60, 600],
    ["Mercury Field Gun", 15, 2250],
    ["Phobos Mine Launcher", 60, 165],
    ["Scylla Double-Barreled Mortar", 40, 400],
    ["Whirlwind Light Gatling Gun", 50, 450]
    // Your Light Gun here
  ];
   
   return arrGuns[numLookupGun];   
}

function getHeavyGun(numLookupGun) {
  /* Returns an array with the following information:
  arrGun*number* = ["Gun Name", Arc Left Degrees, Arc Right Degrees, Range in meters]
  Coincidentally, you define a new gun by making an array in this function with
   its information */
   
  //TODO: Nothing here because no ships with heavy guns are implemented
  
  var arrGuns = [
  [],
  // ["Your gun here"
  ]
}

function getShip(numLookupGun) {
  /* Returns an array with the following information:
  [0] = ["Ship Name", number of gun slots]
  [gun slot number] = [boolean (Is Heavy Gun), [GunPositionX, GunPositionY], GunOffsetDeg]
  The gun offset is the direction that a gun is pointing when it is
   straight forward in its slot, with the fore of the ship being 90 degrees
   and positive degrees is counterclockwise.
  For example, the Squid's front gun's offset is 90 degrees. Its rear gun
   offset is 310 degrees since it is angled 40 degrees left when facing the
   aft of the ship.
  
  Coincidentally, you define a new gun slot by making an array in this function 
   with its information. */
   
  /* Example call: `GetInformationOfShip(1)` for everything about the Squid */
  
  var arrShips = [ 
    [ ],
    [
      ["Squid", 3],
      [false, [0, 15.8], 90],
      [false, [8, 0], 0],
      [false, [0, -9.05], 310]
    ] 
    /* ["Your ship here", 1],
      [false, [0, 0], 90]
    ]*/
  ];
  
  return arrShips[numLookupGun];
}

function getArcAnglesForGun(numOffsetDeg, numGunArcDeg) {
  /* Returns an array in the format 
   [Gun's Left Arc Degrees, Gun's Right Arc Degrees]
   Where left and right are determined by someone firing the gun
  Simply put, 0 degrees is facing directly fore of the ship, 270 degrees is 
   directly astarboard. That means that 90 is aport, and so on.
  The origin of the ship is determined arbitrarily. */
  
  var arrArcAngles = [0, 0];
  
  arrArcAngles[0] = numOffsetDeg - numGunArcDeg;
  arrArcAngles[1] = numOffsetDeg + numGunArcDeg;
    
  // Make sure the angles are within 360 degrees
  for (var i = 0; i <= 1; i++) {
    if (arrArcAngles[i] > 360) {
      arrArcAngles[i] -= 360;
    } else if (arrArcAngles[i] < 0) {
      arrArcAngles[i] += 360;
    }
  }
  
  return arrArcAngles;
}

function getLineSlopeFromAngle(numAngle) {
  /* Returns an array of the line slope (m in y = (m * x) + b) given an angle
      in degres. 0 degrees is right along the x axis.*/
  
  //REMEMBER: Add 90* to any gun angle measurements before inputting them  
  
  /* The answer of tan(90) or tan(270) is impossible, so return as close as 
  possible. */
  
  var numArc;
  
  // Make sure the angle is within 360 degrees
  if (numAngle > 360) {
    numAngle -= 360;
  } else if (numAngle < 0) {
    numAngle += 360;
  }
  
  if (numAngle === 90) {
    numArc = -Infinity;
  } else if (numAngle === 270) {
    numArc = Infinity;
  } else {
    numArc = Math.tan(Math.radians(numAngle));
  }
  
  return numArc;
}

function getLineYIntercept(numLineSlope, numPointOnLineX, numPointOnLineY) {
  // Returns the y intercept, b in y=mx+b, given line slope and a point.
  // Remember: The point can be where the gun is in cartesian space. 
  
  // Since y=mx+b, b=y-mx
  return (numPointOnLineY - (numLineSlope * numPointOnLineX));
}

function getLineIntersection(arrLine1, arrLine2) {
  /* Returns an array [x, y] at the point where two lines intersect when given
      m and b for both equations. Will return null if they don't intersect
      
     ArrLine* should be formatted as [m, b] */
     
  var numLine1M = arrLine1[0];
  var numLine1B = arrLine1[1];
  var numLine2M = arrLine2[0];
  var numLine2B = arrLine2[1];
  var numIntersectionX;
  var numIntersectionY;
  
  numIntersectionX = (numLine2B-numLine1B) / (numLine1M - numLine2M);
  numIntersectionY = (numLine1M * numIntersectionX) + numLine1B;
  
  return [numIntersectionX, numIntersectionY];
}

function getDistanceOfLineSegment(arrEndpoint1, arrEndpoint2) {
  /* Returns a distance from arrEndpoint1 to arrEndpoint2 as a number.
     arrEndpoint* should be passed as [x, y] */
  
  var numXDistance;
  var numYDistance;
  var numSegmentDistance;
  
  numXDistance = arrEndpoint1[0] - arrEndpoint2[0];
  numYDistance = arrEndpoint1[1] - arrEndpoint2[1];
  
  numSegmentDistance = Math.sqrt( (numXDistance * numXDistance) + 
                                  (numYDistance * numYDistance) );
  
  return numSegmentDistance;
}

function main() {
  var numShipSelection = 0;
  
  /* This stores [ [] [ ["Gun Name", Arc Degrees, Range in meters], 
      [GunPositionX, GunPositionY], [LeftArcM, LeftArcB], [RightArcM, RightArcB], [LeftArcAngle, RightArcAngle] ] [...] ]
     Each array inside the parent stores information about the gun slot with its
      index number. index 0 has nothing. */
  var arrGunSlots = [ [] ];
  var arrShipInformation = [];
  var numPromptWorking;
  var strSelectionOutput;
  
  
  numShipSelection = getInputIntegerInRange("Enter the number of the ship " +
                                            "you would like to check", 1, 1);
  
  arrShipInformation = getShip(numShipSelection);
  
  strSelectionOutput = "Your selected ship: " + arrShipInformation[0][0] + "<br>";
  
  // Input loop
  for (var index = 1; index <= arrShipInformation[0][1]; index++) {
  
    // Make a place for this slot in the array with some data for easier debugging
    arrGunSlots.push([["Gun Name", -1, -2], 
      [-3, -4], [-5, -6], [-7, -8]]);
  
    //Picks whether we need to prompt for a light or heavy gun
    if (arrShipInformation[index][0]) {
      numPromptWorking = getInputIntegerInRange("Please enter the number of " +
                                                "the heavy gun in slot " + 
                                                index + ".", 1, 1);
      arrGunSlots[index][1] = getHeavyGun(numPromptWorking);
    } else {
      numPromptWorking = getInputIntegerInRange("Please enter the number of " +
                                                "the light gun in slot " + 
                                                index + ".", 1, 11);
      arrGunSlots[index][0] = getLightGun(numPromptWorking);
    }
  
    // Put the gun's position into the gun info array
    arrGunSlots[index][1] = arrShipInformation[index][1];
    
    // Get the slope of the gun's arcs, then put them into the gun info array
    arrGunSlots[index][4] = getArcAnglesForGun(arrShipInformation[index][2], 
                                               arrGunSlots[index][0][1]);
    arrGunSlots[index][2][0] = getLineSlopeFromAngle(arrGunSlots[index][4][0]);
    arrGunSlots[index][3][0] = getLineSlopeFromAngle(arrGunSlots[index][4][1]);
    
    // Get the intercept of the gun's arc lines, into the gun info array
    arrGunSlots[index][2][1] = getLineYIntercept(arrGunSlots[index][2][0], 
                                                 arrGunSlots[index][1][0], 
                                                 arrGunSlots[index][1][1]);
    
    arrGunSlots[index][3][1] = getLineYIntercept(arrGunSlots[index][3][0], 
                                                 arrGunSlots[index][1][0], 
                                                 arrGunSlots[index][1][1]);
    
    strSelectionOutput = strSelectionOutput + "Your selected weapon for slot " +
                         index + ": " + arrGunSlots[index][0][0] + "<br>";
  }
  
  // Print out what the user has selected so far
  document.write(strSelectionOutput);
  
  
  
  // Variables for the decision loop
  var arrLoopGunArcs = [ [0], [0] ];
  var arrLoopInnerLine = [];
  var arrLoopIntersectionPoint = [0, 0];
  var arrLoopIntersectionDistance = [];
  var arrLoopOuterLine = [];
  var strIntersectOutput = "";
  
  /*indexOuter is the number of the gun for which we are checking the right arc.
     indexInner is the number of gun we're checking the left arc.
    if indexOuter's right arc intersects with indexInner's left arc, great!
    if their intersection is within range of both guns, it's a hit! */
  
  for (var indexOuter = 1; indexOuter <= arrShipInformation[0][1]; indexOuter++) {
    
    // Place some information into an easier-to-access/read array
    arrLoopOuterLine = arrGunSlots[indexOuter][3];
    arrLoopGunArcs[0] = getArcAnglesForGun(arrShipInformation[indexOuter][2], 
                                            arrGunSlots[indexOuter][0][1]);
    
    for (var indexInner = 1; indexInner <= arrShipInformation[0][1]; indexInner++) {
    
      // Don't check a gun against itself, that'll produce weirdness.
      if (indexOuter != indexInner) {
        
        arrLoopInnerLine = arrGunSlots[indexInner][2];
        arrLoopIntersectionPoint = getLineIntersection(arrLoopOuterLine, 
                                                        arrLoopInnerLine);
        arrLoopGunArcs[1] = getArcAnglesForGun(arrShipInformation[indexInner][2],
                                                arrGunSlots[indexInner][0][1]);
        
        // Place the distance from the intersection point to the guns in an array
        arrLoopIntersectionDistance[0] = getDistanceOfLineSegment(
                                          arrGunSlots[indexOuter][1], 
                                          arrLoopIntersectionPoint);
        arrLoopIntersectionDistance[1] = getDistanceOfLineSegment(
                                          arrGunSlots[indexInner][1], 
                                          arrLoopIntersectionPoint);
        arrLoopIntersectionDistance[2] = (getDistanceOfLineSegment([0,0], 
                                          arrLoopIntersectionPoint));
                                          
        
        /* If the distance from the guns to the intersection is less than
            from the origin to the intersection, it's in front of the gun.
           If the distance from the gun to the intersection is under its max 
            range, we have an intersection we should report. */
        if ((arrLoopIntersectionDistance[2] >= arrLoopIntersectionDistance[0]) &&
            (arrLoopIntersectionDistance[2] >= arrLoopIntersectionDistance[1]) &&
            (arrLoopIntersectionDistance[0] < arrGunSlots[indexOuter][0][2]) &&
            (arrLoopIntersectionDistance[1] < arrGunSlots[indexInner][0][2])) {
          strIntersectOutput = strIntersectOutput + "Guns " + indexInner + 
                                " and " + indexOuter + " intersect! " +
                                "The enemy must be about " + 
                                Math.round(arrLoopIntersectionDistance[2]) + 
                                " meters away." + "<br>";
        }
        
        /* Internal Logging - Uncomment to see more information on what's 
            happening in this loop */
        /*
        console.log("Gun " + indexOuter + " and " + indexInner);
        console.log("Intersection: " + arrLoopIntersectionPoint);
        console.log("Gun Location 1: " + arrGunSlots[indexOuter][1]);
        console.log("Gun Equation 1: y = " + arrLoopOuterLine[0] + "(x) + " + 
                    arrLoopOuterLine[1]);
        console.log("Gun Location 2: " + arrGunSlots[indexInner][1]);
        console.log("Gun Equation 2: y = " + arrLoopInnerLine[0] + "(x) + " + 
                    arrLoopInnerLine[1]);
        console.log("intersectionDistance0: " + arrLoopIntersectionDistance[0]);
        console.log();
        */
      }

    }
  }
  
  // Finally, say everything we've been holding in.
  document.write(strIntersectOutput);
  
}


main();





