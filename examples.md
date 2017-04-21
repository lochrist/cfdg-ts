```
// testing site: http://alpico.la/contextfree.js/
// Tree
startshape SCALE

rule SCALE{
	FOREST{ s .03 y -1 x .5 }
}

rule FOREST {
     SEED {}
     SEED {x -20}
     SEED {x -40}
}

rule SEED {BRANCH {}}
rule SEED {BRANCH {rotate 1}}
rule SEED {BRANCH {rotate -1}}
rule SEED {BRANCH {rotate 2}}
rule SEED {BRANCH {rotate -2}}
rule SEED {FORK {}}

rule BRANCH {LEFTBRANCH {flip 90}}
rule BRANCH {LEFTBRANCH {}}

rule LEFTBRANCH 4 {BLOCK {} LEFTBRANCH {y 0.885 rotate 0.1 s 0.99}}
rule LEFTBRANCH 4 {BLOCK {} LEFTBRANCH {y 0.885 rotate 0.2 s 0.99}}
rule LEFTBRANCH {BLOCK {} LEFTBRANCH {y 0.885 rotate 4 s 0.99}}
rule LEFTBRANCH {BLOCK {} FORK {}}


rule BLOCK {
     SQUARE {rotate 1}
     SQUARE {rotate -1}
     SQUARE {}
}

rule FORK {
     BRANCH { }
     BRANCH {s 0.5 rotate 40}
}
rule FORK {
     BRANCH { }
     BRANCH {s 0.5 rotate -40}
}
rule FORK {
     BRANCH {s 0.5 rotate -20}
     BRANCH { }
}
rule FORK {
     BRANCH {s 0.7 y 0.1 rotate 20}
     BRANCH {s 0.7 y 0.1 rotate -20}
}	
```

```
// heart with vines
startshape lost

rule lost {
  half { flip 90 x 0.4 b 0.6 }
  half {x -0.4 b 0.6 }
}
  
rule MOUSECLICK{ vine { s 0.2 0.2 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r 30 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r 60 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r 90 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r 120 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r 150 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r 180 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r -30 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r -60 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r -90 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r -120 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r -150 } }
rule MOUSECLICK{ vine { s 0.2 0.2 r -180 } }

rule half {
  CIRCLE { hue 0 sat 1 }
  half { s 0.959 0.97 x 0.0164 y -0.03 b -0.008 }
}

rule vine 15 {
  CIRCLE { s 1 0.4 }
  vine { s 0.96 x 0.4 r 10 z 0.05 b 0.01 }
}

rule vine 2 {
  TRIANGLE { s 0.3 1.2 r 40 y -0.3 flip 0 }
  vine { }
}

rule vine {
  vine { flip 0 }
}
```

```
// series of tube
startshape scale

rule scale{
  Pipe{ s .05 b .5 }
  Pipe{ s .05 b .5 f 180}
  Pipe{ s .05 b .5 r 90 x -.06}
  Pipe{ s .05 b .5 r 270 x .06 }
}

rule Pipe{
 SQUARE{ s 1.2 .9 b 1}
 SQUARE{}
 Pipe{ y .3 }
}

rule Pipe .1{
  SQUARE{ s 1.5 .7 }
  Pipe{}
}

rule Pipe .03 {
  Rotate{}
}

rule Pipe .1{
  Pipe{ s .95 }
}

rule Pipe .5{
  Pipe{ flip 90 }
}

rule Rotate{
  SQUARE{ s 1.2 .9 b 1}
  SQUARE{}
  Rotate{ r 3 y .5}
}

rule Rotate .02{
  Pipe{}
}

rule Rotate .01 {
  Gauge{}
}

rule Gauge {
  SQUARE{ s .1 1.5 y -1.5 x -.75 r 90}
  CIRCLE{ b -1 y -1.5 x -1.5}
  CIRCLE{ b .8 y -1.5 x -1.5 s .9}
  SQUARE{ s .1 .5 y -1.5 x -1.5 r 20}
  Rotate{}
}

rule Rotate .005{
  Rotate{ flip 90 }
}

rule Pipe .01{
  Gauge{}
}

rule Pipe .003{
  Pipe{ r 90}
  Pipe{}
}


rule Pipe .003{
  Pipe{ r -90}
  Pipe{}
}


rule Pipe .005{
  SQUARE{ s 1.6 .6 b 1}
  SQUARE{ s 1.5 .7 }
}
```

```
// mouse motion
startshape STARTER

rule STARTER{
  DOT{}
}

rule DOT{
  CIRCLE{ s 1 b 1 a -.99 }
  CIRCLE{ s .33 b 1 a -.5 }  
  CIRCLE{ s .3 b .5 sat 0 }
  MOTION{ h .2 }
}

rule MOTION{
  DOT{ x .05 }
}

rule MOTION{
  DOT{ x -.05 }
}

rule MOTION{
  DOT{ y .05 }
}

rule MOTION{
  DOT{ y -.05 }
}

rule MOUSECLICK{
  DOT{ s .5 }
}
```

```
// cute
startshape scale
background { hue 400 sat 0.2 b -1 }

rule MOUSECLICK{ START{ s .001 } }
rule MOUSECLICK{ START{ s .005 } }  
rule MOUSECLICK{ START{ s .01 } }
rule MOUSECLICK{ START{ s .003 r 5} }

rule scale{
  START{ s .007 }
}

rule START {
    SCENE { h 900 sat 1 b .5 }
    FUXIA {h 400 sat 1 b .5}
    START {y 100 r 90  s 0.29}
}

rule FUXIA{
    CIRCLE { s 10 x -10  }
    CIRCLE { x 50 s 5  }
    CIRCLE { x 15 y 15  size 5 }
    FUXIA {y 50 r 88  s 0.59 alpha -0.15}
}
rule FUXIA 0.45 {
    FUXIA{flip -50}
    FUXIA {flip -10}
}
rule SCENE {
    CIRCLE {  size 20 }
    CIRCLE {  size 30 alpha -0.7 }
    CIRCLE {  size 40 alpha -0.7 }
    FLOW { }
    FLOW { }
    FLOW { flip -50 }
    FLOW { flip -50 }
    FLOW { flip -10 }
    FLOW { flip -10 }
}
rule FLOW 0.008 {
    SQUARE { }
    CIRCLE { s 5 alpha -0.7 }
    FLOW { x 1 s 0.995 r 2}
}
rule FLOW 0.0001 {
    FLOW { flip 2 }
}
```

```
// spiral
startshape scale
 
rule scale{
  spiral{s .1 y -.5 x 1}
}
 
rule spiral{
 SQUARE{ a -.5 }
 spiral{ y 1.5 r 10 s .99}
}
 
rule spiral .01 {
 TRIANGLE{ }
 spiral{ y 1.5 r 10 s .95}
 spiral{ y 1.5 r 10 s .95 flip 90}
}
```