'use strict';

angular.module('boar-ng-common', [])
  .directive({
    eTable: require('./directives/e-table/index').create(),
    eTableCell: require('./directives/e-table/cell').create(),
    eTableAction: require('./directives/e-table/action').create(),
    eTableButton: require('./directives/e-table/button').create(),
    eTablePager: require('./directives/e-table/pager').create(),
    ePager: require('./directives/e-pager').create(),
    eSteps: require('./directives/e-steps').create(),
  });
