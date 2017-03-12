'use strict';

angular.module('darwinApp')
  .controller('SearchHistoryCtrl', function ($scope, search) {
  	$scope.keywordClicked = false;
    search.getAllPreviouslySearchedKeywords().then(function(searches) {
    	$scope.searches = searches.data;
    }).catch(function(error) {
    	console.log(error);
    });
    $scope.getLocalImages = function(images) {
    	$scope.keywordClicked = true;
    	console.log(images);
    	$scope.images = images;
    };
  });
