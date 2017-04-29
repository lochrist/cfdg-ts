# TODO

- Separate grammar parser (use jison), json builder, evaluator and renderer
- keep first pass really simple:
    - loop
    - rule with recursion
    - no target, no transform
    - what to do with functions (sin, cos, ...) -> nothing for now.
- app with some examples (selector)

### Modes of evaluation
- Compute all shapes, render all shapes
- Compute 1 shape, render one shape (with coroutines?)