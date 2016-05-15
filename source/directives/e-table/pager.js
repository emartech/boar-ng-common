'use strict';

class TablePagerController {

  constructor() {
  }

  static create() {
    return () => ({
      require: '^eTable',
      link: (scope, element, attrs, parentCtrl) => {
        let options = (scope.options || '5,10,15,20,25,50').split(/\s*,\s*/);
        let limit = scope.limit || options[0];
        parentCtrl.initPager({
          limit: limit,
          options: options
        });
        element.remove();
      },
      restrict: 'E',
      scope: {
        limit: '@',
        options: '@'
      },
      replace: true,
      controller: [TablePagerController],
      controllerClass: TablePagerController
    });
  };
}

module.exports = TablePagerController;
