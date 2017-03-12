'use strict';

describe('Controller: SearchHistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('darwinApp'));

  var SearchHistoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchHistoryCtrl = $controller('SearchHistoryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
