'use strict';

class TableCellController {

  constructor() {
  }

  static create() {
    return () => ({
      require: '^eTable',
      link: (scope, element, attrs, parentCtrl) => {
        let classNames = (scope.class || '').split(/\s+/);
        if (scope.width) {
          classNames.push('e-table__col-' + scope.width);
        }
        parentCtrl.addCell({
          title: scope.title,
          sortField: scope.sortField,
          value: element.html(),
          class: classNames.join(' ')
        });
        element.remove();
      },
      restrict: 'E',
      scope: {
        title: '@',
        sortField: '@',
        width: '@',
        class: '@'
      },
      replace: true,
      controller: [TableCellController],
      controllerClass: TableCellController
    });
  };
}

module.exports = TableCellController;
