# Arc Finder for Guns of Icarus Online

Calculates intersecting gun arcs on ships in Guns of Icarus Online. This allows captains to better select their loadouts and ranges.

## To run this code:

1. Download this repository
1. Open index.html in your browser
2. That is it.

## Currently implemented:

### Light Weapons

All PVP light guns except the Beacon Flare and Tempest Cluster Missile.

The flare gun's large available arc causes problems with the algorithm that checks whether an intersecting arc is in front of or behind the ship.

### Heavy Weapons

None, though the program is ready to accept them.

### Ships

* Squid

## How to contribute

### Adding new weapons

1. Pick either the getLightGun function or getHeavyGun function, depending on which type of weapon you're adding
2. Create a new entry in the weapons array, arrGuns, with the information specified.
3. Change the second argument in the prompt for your gun type (highligted with asterisks here) to the new number of available guns of that type:

```
numPromptWorking = getInputIntegerInRange("Please enter the number of " +
                                                "the (heavy/light) gun in slot " + 
                                                index + ".", 1, *11*);
```

Please note that slot 0 of the array should always be empty.

### Adding new ships

* Same as adding a new weapon, but with a deeper array required. Ships are located in the getShip function and the format is documented there.

You can measure for gun positions using the image in this repository. Remember to convert to meters by dividing your pixel measurements by 20.
