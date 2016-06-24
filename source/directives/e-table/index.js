'use strict';

let templateHtml = `
<div>
  <div ng-transclude="ng-transclude" style="display: hidden"></div>
  <table class="e-table e-table-overview" data-e-version="2">
    <thead>
      <tr ng-if="table.showSearch || (table.buttons.length &gt; 0)">
        <td class="e-table__col e-table__col-filter" colspan="{{table.columnCount}}">
          <div class="e-table__datatablefilter">
            <div class="e-table__button float-right" ng-repeat="button in table.buttons">
              <a class="e-btn e-btn-primary" href="{{ button.href }}">{{ table.evaluate(button.title, this) }}</a>
            </div>
          </div>
          <div class="dataTables_filter" ng-if="table.showSearch">
            <label>
              {{ 'Search' | translate }} &nbsp;
              <input class="e-input" type="search" ng-model="table.filter"/>
            </label>
          </div>
        </td>
      </tr>
      <tr>
        <th class="e-table__col" ng-repeat="cell in table.cells" ng-click="table.sortBy(cell.sortField)" ng-class="{ 'e-table__sort': cell.sortField, 'e-table__sort-desc': table.order.field === cell.sortField &amp;&amp; table.order.reverseSort, 'e-table__sort-asc': table.order.field === cell.sortField &amp;&amp; !table.order.reverseSort }">
          {{ table.evaluate(cell.title, this) }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="row in table.rows | filter:table.filter | orderBy: table.order.field:table.order.reverseSort | limitTo: table.pager.limit:(table.pager.page-1)*table.pager.limit">
        <td class="e-table__col {{cell.class}}" ng-repeat="cell in table.cells" ng-bind-html="table.getCellValue($index, this)"></td>
        <td class="e-table__col e-table__col-actions e-table__col-x-small">
          <a class="e-tooltip" data-e-tooltip="{{ table.evaluate(action.tooltip, this) }}" href="{{ table.getActionLink(action.href, this) }}" ng-click="table.actionClick($event, action.action, this)" ng-repeat="action in table.actions">
            <svg class="e-icon e-icon-table">
              <use xlink:href="{{ action.icon }}"></use>
            </svg>
          </a>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="{{table.columnCount}}" ng-if="table.showPager">
          <div class="float-left">
            {{ 'Show' | translate }} &nbsp;
            <select class="e-select e-select-inline e-select__select2 e-select-small" ng-model="table.pager.limit" ng-options="option for option in table.pager.options track by option"></select>
            &nbsp; {{ 'rows' | translate }}
          </div>
          <div class="float-right">
            <e-pager page="table.pager.page" page-size="table.pager.limit" total="table.pager.total"></e-pager>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
`;

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
    this.showPager = false;

    this.order = {
      field: $attrs.defaultSortField,
      reverseSort: $attrs.defaultSortOrder === 'desc' ? true : false
    };

    this.pager = {
      page: 1,
      limit: 100,
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
    this.showPager = true;
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
      template: templateHtml,
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
