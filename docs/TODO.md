# TODO

## Goals
- keep first pass really simple:
    - loop
    - rule with recursion
    - no target color, no transform
    - what to do with functions (sin, cos, ...) -> nothing for now.
- app with some examples (selector)

### Parser
- Jison
- antlr: https://github.com/antlr/antlr4/blob/master/doc/index.md

### Tasks
- stop recursion on shape too small
- better handling of scaling + potential scaling according to shape area?
- different evaluator strat (with requestAnimationFrame)
- different rendering strat (with requestAnimationFrame)
- background
- ensure that grammar can have animation (with a cancel button)
- examples selector
- rule parser

### Stats
- nb of times each rule is evaluated
- nb of shapes drawn
- stats on the different algo:
    - shapes processing time (if finite)
    - drawing processing time (if finite)
    - frame counter (fps?)

### Modes of evaluation
- Compute all shapes, render all shapes
- Compute 1 shape, render one shape (with coroutines?)