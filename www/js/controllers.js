
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

    $scope.newProposal = function(){
      alert("hi!")
    }

    $scope.cancelNewProposal = function(){
      $scope.proposalModal.hide();
    }
}])
// .controller('modalCtrl', ['$scope', function($scope,  $ionicModal){

//   $ionicModal.fromTemplateUrl('new_proposal.html', function(modal){
//       $scope.proposalModal = modal;
//     }, {
//       scope: $scope,
//       animation: 'slide-in-up'
//     });

//     $scope.newProposal = function(){
//       alert("hi!")
//     }

//     $scope.cancelNewProposal = function(){
//       $scope.proposalModal.hide();
//     }
// }]);

