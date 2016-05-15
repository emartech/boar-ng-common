'use strict';

class PagerController {

  constructor() {
    this.init();
  }

  static create() {
    return () => ({
      template: require('./index.jade'),
      restrict: 'E',
      scope: {
        steps: '=',
        step: '='
      },
      replace: false,
      bindToController: true,
      controller: [PagerController],
      controllerAs: 'ctrl',
      controllerClass: PagerController
    });
  };

  init() {
    if (!this.steps || !this.steps.length) {
      return;
    }

    this.step = this.step || 1;
    this.setPrev();
    this.setNext();
  };

  setNext() {
    if (this.step < this.steps.length && !this.steps[this.step].disabled) {
      this.next = this.step + 1;
    } else {
      this.next = false;
    }
  };

  setPrev() {
    if (this.step > 0) {
      this.prev = this.step - 1;
    } else {
      this.prev = false;
    }
  };

  action(step) {
    if (!step || this.steps[step - 1].disabled) {
      return;
    }

    this.step = step;
    this.init();
  }
}

module.exports = PagerController;
