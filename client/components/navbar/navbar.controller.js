'use strict';

angular.module('darwinApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Search',
      'link': '/'
    },
    {
      'title': 'Search History',
      'link': '/searchHistory'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });