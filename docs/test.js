/*
startshape scale
background{ b -1 }

rule scale{
  c{ s .8 b 1 }
}

rule c {
	SQUARE{ r 3 }
	CIRCLE{ y 1 s .5 }
	CIRCLE{ x 1 s .5 }
	CIRCLE{ x -1 }	
	SQUARE{ y -3 s 1.2 r 45}
	c { x -2 s .5 r 5 }		
}

rule c .3 {
	CIRCLE{ }
}

rule c .2 {
	c{ rotate -10 s .1}
}
*/

let p = new Program({background: 'red'})
    .rule('scale', [
        draw('c', {s: 0.8, d: 1})
    ])
    .rule('c', [
        square({r: 3}),
        circle({y: 1, s: 5}),
        circle({x: 1, s: 5 }),
        circle({y: 1 }),
        square({y: 3, s: 1.2, r: 45}),
        draw('c', {x: 2, s: 0.5, r: 0.5 })
    ])
    .rule('c', 0.3, [
        circle()
    ]),
    .rule('c', 0.2, [
        draw('c', {rotate: -10, s: 0.1})
    ]);

p.render();


let p = new Program({ background: 'red' })
    .rule('scale', [
        draw('c').sat(0.8).brightness(1)
    ])
    .rule('c', [
        square({ r: 3 }),
        circle({ y: 1, s: 5 }),
        circle({ x: 1, s: 5 }),
        circle({ y: 1 }),
        square({ y: 3, s: 1.2, r: 45 }),
        draw('c', { x: 2, s: 0.5, r: 0.5 })
    ])
    .rule('c', 0.3, [
        circle()
    ]),
    .rule('c', 0.2, [
    draw('c', { rotate: -10, s: 0.1 })
]);
