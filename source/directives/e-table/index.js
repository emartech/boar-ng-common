'use strict';

class TableController {

  constructor($scope, $attrs, $parse, $interpolate, $sce) {
    this.$scope = $scope;
    this.$parse = $parse;
    this.$interpolate = $interpolate;
    this.$sce = $sce;

    this.cells = [];
    this.actions = [];
    this.buttons = [];
    this.columnCount = 1;
    this.showSearch = typeof $attrs.showSearch !== 'undefined';

    this.order = {
      field: $attrs.defaultSortField,
      reverseSort: $attrs.defaultSortOrder === 'desc' ? true : false
    };

    this.pager = {
      page: 1,
      options: []
    };

    let getTableData = $parse($attrs.model);
    $scope.$parent.$watch($attrs.model, () => {
      this.rows = getTableData($scope.$parent);
      this.pager.total = this.rows.length;
    });
  }

  sortBy(field) {
    if (field) {
      if (this.order.field === field) {
        this.order.reverseSort = !this.order.reverseSort;
      } else {
        this.order.field = field;
      }
    }
  }

  addCell(params) {
    this.cells.push(params);
    this.columnCount++;
  }

  addAction(params) {
    this.actions.push(params);
  }

  addButton(params) {
    this.buttons.push(params);
  }

  initPager(params) {
    this.pager.limit = params.limit;
    this.pager.options = params.options;
  }

  evaluate(template, scope) {
    return this.$sce.trustAsHtml(
      this.$interpolate(template)(scope)
    );
  }

  getCellValue(col, scope) {
    return this.$sce.trustAsHtml(
      this.$interpolate(this.cells[col].value)(scope)
    );
  }

  getActionLink(linkTemplate, scope) {
    if (linkTemplate) {
      return this.$interpolate(linkTemplate)(scope);
    } else {
      return '#';
    }
  }

  actionClick($event, action, scope) {
    if (action) {
      $event.preventDefault();
      this.$parse(action)(scope);
    }
  }

  static create() {
    return () => ({
      template: require('./index.jade'),
      transclude: true,
      restrict: 'E',
      scope: true,
      controllerAs: 'table',
      replace: true,
      controller: ['$scope', '$attrs', '$parse', '$interpolate', '$sce', TableController],
      controllerClass: TableController
    });
  };
}

module.exports = TableController;
