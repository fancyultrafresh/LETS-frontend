angular.module('letsApp.controllers', [])

.controller('ActiveThreadCtrl', function($scope, $http){
  $http.get('http://jsonplaceholder.typicode.com/users').then(function(resp){
    console.log(resp);
    // debugger;
    $scope.threadUsers = resp.data;
  }, function(err){
    console.error('ERR', err);
  })
});
