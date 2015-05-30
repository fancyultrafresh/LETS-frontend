
app.controller('ActiveDecisionCtrl', ['$scope', 'Decision', function($scope, Decision){

    $scope.decisionUsers = Decision.query();

    $scope.decisionData = {};
    // $scope.newDecision = function() {
    //   var query = new Query($scope.queryData);
    //   query.$save();
    // }
}]);

