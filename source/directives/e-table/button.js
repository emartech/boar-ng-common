'use strict';

class TableButtonController {

  constructor() {
  }

  static create() {
    return () => ({
      require: '^eTable',
      link: (scope, element, attrs, parentCtrl) => {
        parentCtrl.addButton({ title: element.html(), href: scope.href });
        element.remove();
      },
      restrict: 'E',
      scope: {
        href: '@'
      },
      replace: true,
      controller: [TableButtonController],
      controllerClass: TableButtonController
    });
  };
}

module.exports = TableButtonController;
