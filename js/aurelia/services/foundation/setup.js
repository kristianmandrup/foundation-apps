class Setup {
  constructor() {
    // Attach FastClick
    if (FastClick) {
      FastClick.attach(document.body);
    }

    // Attach viewport units buggyfill
    if (viewportUnitsBuggyfill) {
      viewportUnitsBuggyfill.init();
    }
  }
}