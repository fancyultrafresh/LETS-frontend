
app.controller('ActiveDecisionCtrl', ['$scope', 'Decision', '$ionicModal', function($scope, Decision, $ionicModal){

    $scope.decisionUsers = Decision.query();
    $scope.decisionName = "Pizza Tonight!"
    $scope.currentProposal = "Dominoes"
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
}])
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state){
  $scope.data = {};

  $scope.login = function(){
    console.log("Login user: " + $scope.data.username + " - Password:" + $scope.data.password)

    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data){
      $state.go('ActiveDecision');
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
        title: "Login failed!",
        template: "Please check your email and password"
      })
    })
  }
});
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

