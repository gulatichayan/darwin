'use strict';

angular.module('darwinApp')
  .factory('search', function ($http) {
    return {
      getDataFromGoogleImageSearch: function(searchKeyword) {
        var data = {
          params: {
            searchKeyword: searchKeyword 
          }
        };
        return $http.get('/api/search/googleImageSearch', data)
      },
      getAllPreviouslySearchedKeywords: function() {
        return $http.get('/api/search/');
      }
    };
  });
