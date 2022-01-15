#!/usr/bin/env node

// Reference
// https://www.liveabout.com/bowling-pin-rack-420521

import yargs from 'yargs'

yargs.parserConfiguration({
    "short-option-groups": true,
    "camel-case-expansion": true,
    "dot-notation": true,
    "parse-numbers": true,
    "parse-positional-numbers": true,
    "boolean-negation": true,
  })

const argv = yargs(process.argv.slice(1)).options({
    pos: { type: 'array', demandOption: true },
    width: { type: 'number', demandOption: true},
    rowCount: { type: 'number', demandOption: true},
    heading: { type: 'number', default: 0}
  }).parseSync();

interface position {    
    x: number,
    y: number
}

const generatePins = (centreBackPos: position, width: number, rowCount: number, heading: number) => {
    let rows: position[] = []
    const ColSpacing = width/rowCount
    const RowSpacingRatio = 1.72916 / 2
    const RowDistance = ColSpacing * RowSpacingRatio

    let currentCentre: position = centreBackPos;

    for (let index = 0; index < rowCount; index++) {
        rows = rows.concat(generateRow(currentCentre, heading,  ColSpacing, rowCount - index));
        currentCentre = moveCoord(currentCentre, heading, RowDistance )
    }

    return rows.flatMap((row) => `(${parseFloat(String(row.x)).toFixed(2)},${parseFloat(String(row.y)).toFixed(2)})`).join('\n');
}

const generateRow = (centrePos: position, heading: number, colSpacing: number, pinCount: number): position[] => {
    let firstPinDistance: number;
    let pinRow: position[] = []
    let rowHeading = changeHeading(heading, -90) // Make rows perpendicular to the original heading

    if (isOdd(pinCount)) {
        firstPinDistance = ((pinCount -1) / 2) * colSpacing
    } else {
        firstPinDistance = ((pinCount /2) * colSpacing) - (colSpacing/2)
    }

    let currentPin: position = moveCoord(centrePos, rowHeading, firstPinDistance)
    pinRow = pinRow.concat(currentPin)

    for (let index = 1; index < pinCount; index++) {
        currentPin = moveCoord(currentPin, changeHeading(rowHeading, -180), colSpacing)
        pinRow = pinRow.concat(currentPin)
    }


    return pinRow
}

const moveCoord = (startPos: position, heading: number, distance: number): position => {
    // Geometric operation 
    // http://motion.cs.illinois.edu/RoboticSystems/CoordinateTransformations.html#Geometric-operations
    // x = r cosθ
    // y = r sinθ

    // r = distance
    // θ = deg

    return { 
        x: distance * Math.sin(degrees_to_radians(heading)) + startPos.x,
        y: distance * Math.cos(degrees_to_radians(heading)) + startPos.y
    }
}

function isOdd(num: number): boolean { return num % 2 === 1; }

const changeHeading = (heading: number, change: number) => {
    const newHeading = heading + change
    if(newHeading > 360){
        return newHeading - 360;
    }
    if (newHeading < 0) {
        return newHeading + 360;
    }

    return newHeading
}

console.log(generatePins(
    {
        x: parseInt(String(argv.pos[0])), 
        y: parseInt(String(argv.pos[1]))
    }, 
    argv.width, 
    argv.rowCount, 
    argv.heading
))

function degrees_to_radians(degrees: number): number
{
  var pi = Math.PI;
  return degrees * (pi/180);
}