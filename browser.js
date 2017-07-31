const trog = (() => {
  const BREAK    = Symbol()
  const SKIP     = Symbol()
  const DEFER    = Symbol()
  const DESCEND  = Symbol()

  function * trog(value, preferred = DEFER) {
    if(typeof value !== 'object')
      throw 'Cannot iterate over a non-object'

    let deferred = {}

    loop: for (const [key, value] of Object.entries(value))
      switch (yield [key, value] || preferred) {
        case BREAK:
          break loop

        case SKIP:
          continue loop

        case DESCEND:
          break (yield * trog(value))

        case DEFER:
          deferred[key] = value
      }

    for(const value of Object.values(value))
      yield * trog(value)
  }

  return Object.assign(trog, {trog, BREAK, SKIP, DEFER, DESCEND})
}());
