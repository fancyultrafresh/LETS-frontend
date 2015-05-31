
app.controller('ActiveDecisionCtrl', ['$scope', 'Decision', '$ionicModal', function($scope, Decision, $ionicModal){

    $scope.decisionUsers = Decision.query();
    $scope.decisionName = "Pizza Tonight!"
    $scope.decisionData = {};
    // $scope.newDecision = function() {
    //   var query = new Query($scope.queryData);
    //   query.$save();
    // }
    // $scope.newProposal = function(){
    //   alert("hi!")
    // }
    $ionicModal.fromTemplateUrl('new_proposal.html', function(modal){
      $scope.proposalModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    $scope.createProposal = function(proposal){
      $scope.decisionName.replace("Pizza", proposal.proposed_idea);
      $scope.proposalModal.hide();
      proposal.proposed_idea = "";
    };

    $scope.newProposal = function(){
      $scope.proposalModal.show();
    }

    $scope.cancelNewProposal = function(){
      $scope.proposalModal.hide();
    }
}]);
