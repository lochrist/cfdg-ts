export let abcdShape = `
// starshape
startshape D

rule D
{
  C {r 15}
  C {r 45}
}

rule C
{
  B {}
  B {f -90}
}

rule C
{
  B {f -100}
}

rule B
{
  A {}
  A {r 60 hue 150}
  A { r 120 }
  A { r 180 hue 150}
  A { r 240 }
  A { r 300 hue 150}
}

rule B
{
  A {}
  A {r 60}
  A { r 120 }
  A { r 180 }
  A { r 240 }
  A { r 300 }
}

rule A
{
  CIRCLE {s 1 .0006 b .5 sat .5 a .9}
  A {x .9 r 120.21 s .99 b .0005 h -1}
}

rule A
{
  CIRCLE {s 1 .0006 b .5 sat .5 a .9}
  A {x .9 r 120.21 s .99 b .0005 h 2 }
}`

export let abcdShapeExpected = {
    "rules": [
        {
            "name": "D",
            "weight": 1,
            "shapes": [
                {
                    "shape": "C",
                    "adjustments": {
                        "rotate": 15
                    }
                },
                {
                    "shape": "C",
                    "adjustments": {
                        "rotate": 45
                    }
                }
            ]
        },
        {
            "name": "C",
            "weight": 1,
            "shapes": [
                {
                    "shape": "B",
                    "adjustments": {}
                },
                {
                    "shape": "B",
                    "adjustments": {
                        "flip": -90
                    }
                }
            ]
        },
        {
            "name": "C",
            "weight": 1,
            "shapes": [
                {
                    "shape": "B",
                    "adjustments": {
                        "flip": -100
                    }
                }
            ]
        },
        {
            "name": "B",
            "weight": 1,
            "shapes": [
                {
                    "shape": "A",
                    "adjustments": {}
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 60,
                        "hue": 150
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 120
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 180,
                        "hue": 150
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 240
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 300,
                        "hue": 150
                    }
                }
            ]
        },
        {
            "name": "B",
            "weight": 1,
            "shapes": [
                {
                    "shape": "A",
                    "adjustments": {}
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 60
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 120
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 180
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 240
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "rotate": 300
                    }
                }
            ]
        },
        {
            "name": "A",
            "weight": 1,
            "shapes": [
                {
                    "shape": "CIRCLE",
                    "adjustments": {
                        "size": [
                            1,
                            0.0006
                        ],
                        "brightness": 0.5,
                        "saturation": 0.5,
                        "alpha": 0.9
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "x": 0.9,
                        "rotate": 120.21,
                        "size": [
                            0.99,
                            0.99
                        ],
                        "brightness": 0.0005,
                        "hue": -1
                    }
                }
            ]
        },
        {
            "name": "A",
            "weight": 1,
            "shapes": [
                {
                    "shape": "CIRCLE",
                    "adjustments": {
                        "size": [
                            1,
                            0.0006
                        ],
                        "brightness": 0.5,
                        "saturation": 0.5,
                        "alpha": 0.9
                    }
                },
                {
                    "shape": "A",
                    "adjustments": {
                        "x": 0.9,
                        "rotate": 120.21,
                        "size": [
                            0.99,
                            0.99
                        ],
                        "brightness": 0.0005,
                        "hue": 2
                    }
                }
            ]
        }
    ],
    "startshape": "D"
}