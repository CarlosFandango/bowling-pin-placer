# bowling-pin-placer

So, this guy, Roger-Smith on our FiveM server wanted bowling. I thought "Great idea! I love bowling!"

But then I realised we had a different MLO for our bowling because, you know... Gabz is amazing BUT I needed to create coordinates for ever damn pin on each lane and that confused me, so I made this one evening.
It's hacky, I know, but it works.



## Usage

Currently it's done on typescript and uses node. I'll be fixing this in a bit.

`npx ts-node index.ts --pos -10 -8 --width 10 --rowCount 2 --heading 20`

`--pos :array` - x:0, y:0 of the center of the back row for the pins
`--width :number` - width between each pin
`--rowCount :number` - pretty obvious... it's how many rows for the pins
`--heading :number` - The heading of you facing the pins. It'll change the orientation of the pins to be 180 degrees to this heading making it easier to place.
