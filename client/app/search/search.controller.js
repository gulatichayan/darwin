'use strict';

angular.module('darwinApp')
  .controller('SearchCtrl', function ($scope, search) {
  	$scope.searchKeyword = "";
  	$scope.imageSearchResult = {};
    $scope.searchImageOnline = function(searchKeyword) {
    	$scope.searchKeyword = "";
    	search.getDataFromGoogleImageSearch(searchKeyword).then(function(response) {
        $scope.imageSearchResult = response.data;
    		console.log($scope.imageSearchResult);
    	}).catch(function(error) {
    		console.log(error);
    	});
    };
    $scope.resetOnlineImageSearchForm = function() {
    	$scope.imageSearchResult = {};
    	$scope.searchKeyword = "";
    };
  });
