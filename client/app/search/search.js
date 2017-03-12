'use strict';

angular.module('darwinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });