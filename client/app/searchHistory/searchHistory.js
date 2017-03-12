'use strict';

angular.module('darwinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('searchHistory', {
        url: '/searchHistory',
        templateUrl: 'app/searchHistory/searchHistory.html',
        controller: 'SearchHistoryCtrl'
      });
  });