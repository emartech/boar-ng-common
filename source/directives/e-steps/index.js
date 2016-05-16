'use strict';

let templateHtml = `
<div class="e-steps">
  <div class="e-steps__nav e-steps__nav-prev" ng-click="ctrl.action(ctrl.prev)" ng-class="{'e-steps__nav-disabled': !ctrl.prev}">
    <svg class="e-icon">
      <use xlink:href="#caret-left"></use>
    </svg>
    <span>{{ 'Previous step' | translate }}</span>
  </div>
  <div class="e-steps__nav e-steps__nav-next" ng-click="ctrl.action(ctrl.next)" ng-class="{'e-steps__nav-disabled': !ctrl.next}">
    <span>{{ 'Next step' | translate }}</span>
    <svg class="e-icon">
      <use xlink:href="#caret-right"></use>
    </svg>
  </div>
  <div class="e-steps__progress">
    <div class="e-steps__item" ng-repeat="(step, data) in ctrl.steps" ng-bind="data.value | translate" ng-class="{'e-steps__item-current': ctrl.step === step + 1, 'e-steps__item-disabled': data.disabled, 'e-steps__item-action': !data.disabled &amp;&amp; ctrl.step !== step + 1}" ng-click="ctrl.action(step + 1)">
    </div>
  </div>
</div>
`;

class PagerController {

  constructor() {
    this.init();
  }

  static create() {
    return () => ({
      template: templateHtml,
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
