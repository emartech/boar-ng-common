'use strict';

class TableActionController {

  constructor() {
  }

  static create() {
    return () => ({
      require: '^eTable',
      compile: (element, attrs) => {
        let params = {
          icon: attrs.icon,
          tooltip: attrs.tooltip,
          href: attrs.href,
          action: attrs.action
        };
        return {
          pre: (scope) => {
            scope.$parent.table.addAction(params);
          }
        };
      },
      restrict: 'E',
      scope: false,
      replace: true,
      controller: [TableActionController],
      controllerClass: TableActionController
    });
  };
}

module.exports = TableActionController;
