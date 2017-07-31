# trog

`trog` is a generator that consumes an object and recursively iterates through its properties, yielding `[key, value]` pairs.

Iteration is breadth-first by default, meaning all the object's immediate properties will be yielded before recursion. This can be configured using a set of exported symbols:

|key|description|
|---|---|
| `BREAK`   | Stop the current iteration |
| `DESCEND` | Iterate through the last yielded value immediately, resuming current iteration later |
| `DEFER`   | Iterate through the last yielded value after current iteration has finished |
| `SKIP`    | Do not iterate through the last yielded value |

Any of these can be passed in as the second argument to a `trog` generator to define default behaviour (eg passing `SKIP` would avoid recursion; passing `DESCEND` would force depth-first recursion), and any of these can be passed back into the generator (by manual iteration via `next(FLAG)`) to respond to specific conditions. For example, you may wish to `SKIP` circular references, or `BREAK` when you recognise a property to be part of a sub-tree you know you don't need to crawl.

# TODO

* Tests
* Examples
* API refinement
