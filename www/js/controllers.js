angular.module('letsApp.controllers', [])

.controller('ActiveDecisionCtrl', function($scope, $http){
  $http.get('http://jsonplaceholder.typicode.com/users').then(function(resp){
    console.log(resp);
    // debugger;
    $scope.decisionUsers = resp.data;
  }, function(err){
    console.error('ERR', err);
  })
});
