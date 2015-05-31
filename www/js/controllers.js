
app.controller('ActiveDecisionCtrl', ['$scope', 'Decision', '$ionicModal', function($scope, Decision, $ionicModal){


    // hard coded variables will be replaced with associated json data from api
    Decision.get().$promise.then(function(resp){
      console.log(resp.context);
      console.log(resp.participants);
      $scope.decisionContext = resp.context
      $scope.decisionUsers = resp.participants
    });

    // debugger;
    // $scope.decisionUsers = $scope.decisionData.context.participants
    // $scope.decisionName = $scope.decisionData.context

    // to get this information, we need to make a separate request to the server for info about the current proposal for the specific decision being rendered
    $scope.currentProposal = "Dominoes"


    $ionicModal.fromTemplateUrl('new_proposal.html', function(modal){
      $scope.proposalModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    $scope.createProposal = function(proposal){

      $scope.decisionName = proposal.proposed_idea;
      $scope.proposalModal.hide();
      // debugger;
      // proposal.proposed_idea = "";
    };

    $scope.newProposal = function(){
      $scope.proposalModal.show();
    }

    $scope.cancelNewProposal = function(){
      $scope.proposalModal.hide();
    }
}])
.controller('LoginCtrl', function($scope, $ionicPopup, $state, $rootScope, $ionicLoading, User){
  $scope.userData = {
    email: null,
    password: null
  };

  $scope.error = {};

  $scope.login = function(){

    console.log("Login user: " + $scope.userData.email + " - Password:" + $scope.userData.password)

    $scope.loading = $ionicLoading.show({
      content: "Logging in",
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });


    var user = $scope.userData;

    User.login($scope.userData).then(function(user){
      $ionicLoading.hide();

      $rootScope.isLoggedIn = true;


      $state.go('ActiveDecision');

    }, function(err){

      $ionicLoading.hide();

      if (err.status === 400) {
        var alertPopup = $ionicPopup.alert({
          title: "Login failed!",
          template: "Please check your email and password"
          });

        $scope.error = err.data.error;
      } else {
        $scope.error = {
          'message': 'There was an error on our end. Please try again later. Sorry!'
        };
      }
    });
  };
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

