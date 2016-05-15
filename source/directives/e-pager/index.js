'use strict';

class PagerController {

  constructor($scope) {
    this.init();
    $scope.$watch(() => this.total, () => this.init());
    $scope.$watch(() => this.pageSize, () => this.init(true));
  }

  static create() {
    return () => ({
      template: require('./index.jade'),
      restrict: 'AE',
      scope: {
        page: '=',
        pageSize: '=',
        total: '='
      },
      replace: false,
      bindToController: true,
      controller: ['$scope', PagerController],
      controllerAs: 'ctrl',
      controllerClass: PagerController
    });
  };

  init(reset = false) {
    if (!this.total) {
      return;
    }

    if (reset) {
      this.page = 1;
    }

    this.list = [];
    this.pageCount = Math.ceil(this.total / this.pageSize);

    this.prev = {
      page: this.page - 1 >= 1 ? this.page - 1 : 1,
      disabled: this.page - 1 <= 0
    };

    this.next = {
      page: this.page + 1 < this.pageCount ? this.page + 1 : this.pageCount,
      disabled: this.page >= this.pageCount
    };

    let adjacent = 1;
    let fullAdjacentSize = (adjacent * 2) + 2;

    if (this.pageCount <= fullAdjacentSize + 2) {
      this.addRange(1, this.pageCount);
    } else {
      if (this.page - adjacent <= 3) {
        this.addRange(1, 1 + fullAdjacentSize);
        this.addLast(1 + fullAdjacentSize);
      } else if (this.page < this.pageCount - (adjacent + 2)) {
        this.addFirst(this.page - adjacent);
        this.addRange(this.page - adjacent, this.page + adjacent);
        this.addLast(this.pageCount, this.page + adjacent);
      } else {
        this.addFirst(this.pageCount - fullAdjacentSize);
        this.addRange(this.pageCount - fullAdjacentSize, this.pageCount);
      }
    }
  };

  addFirst(next) {
    this.addRange(1, 1);

    if (next !== 2) {
      this.addItem('...', 0, true);
    }
  }

  addLast(prev) {
    if (prev !== this.pageCount - 2) {
      this.addItem('...', 0, true);
    }

    this.addRange(this.pageCount, this.pageCount);
  }

  addRange(start, stop) {
    let i = 0;

    for (i = start; i <= stop; i++) {
      this.addItem(i, i);
    }
  }

  addItem(value, page, disabled) {
    this.list.push({
      value: value,
      disabled: disabled,
      active: this.page === page && !disabled,
      page: page
    });
  }

  action(page) {
    this.page = page;
    this.init();
  }
}

module.exports = PagerController;
