require.config({
  paths: {
    PolyK: 'libs/polyk',
    PIXI: 'libs/pixi',
    jQuery: 'libs/jquery',
    SAT: 'libs/SAT',
    EventDispatcher: 'libs/EventDispatcher'
  },
  shim: {
    SAT: {
        exports: 'SAT'
    },
    PolyK: {
        exports: 'PolyK'
    },
    PIXI: {
        exports: 'PIXI'
    },
    EventDispatcher: {
        exports: 'EventDispatcher'
    },
    jQuery: {
        exports: 'jQuery'
    }
  }
});

require(["modules/game"]);