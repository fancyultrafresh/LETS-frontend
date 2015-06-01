app.factory('Decision', function($resource){
  return $resource('https://letsmobile.herokuapp.com/api/users/1/decisions/1');
})
// .service('LoginService', function($q){
//   return {
//     login: function(name, pw){
//       var deferred = $q.defer();
//       var promise = deferred.promise;

//       if (name == "user" && pw == "secret"){
//         deferred.resolve('Welcome ' + name + "!");
//       } else {
//         deferred.reject('Wrong username and/or password');
//       }
//       promise.success = function(fn){
//         promise.then(fn);
//         return promise
//       }
//       promise.error = function(fn){
//         promise.then(null, fn);
//         return promise
//       }
//       return promise;
//     }
//   }
// });
.factory('User', ['$rootScope', '$q', '$http', function($rootScope, $q, $http){
  var u = {
    logout: function(){
      window.localStorage.removeItem('user');
      $rootScope.user = null;
      $rootScope.isLoggedIn = false;
    },
    load: function(){
      var eu = window.localStorage.getItem('user');

      if(!eu) {
        return null
      }

      var u = JSON.parse(eu);

      $rootScope.user = u;

      if($rootScope.user.email && $rootScope.user.password){
        $rootScope.$emit('user.loggedIn');
      }
      return $rootScope.user;
    },

    store: function(user, extra){
      var u = angular.extend({}, user, extra);
      $rootScope.user = angular.copy(u);

      window.localStorage.setItem('user', JSON.stringify($rootScope.user));
    },

    get: function(){
      var q = $q.defer();

      if($rootScope.user){
        q.resolve($rootScope.user);
      } else {
        $http.get(API_URL + '/user').then(function(resp){
          $rootScope.user = resp.data;
          q.resolve(resp.data);
        }, function(err) {
          $rootScope.user = null;
          q.reject(err);

          $rootScope.$emit('user.loggedOut', err);
        });
      }
      return q.promise;
    },

    login: function(data) {
      var q = $q.defer();

      $http({
        method: 'POST',
        url: 'letsmobile.herokuapp.com/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data,

        transformRequest: function(obj){
          var str = [];
          for( var p in obj )
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        },
      }).then(function(resp) {
        u.store(resp.data, data);
        q.resolve(resp.data);
      }, function(err) {
        q.reject(err);
      });
      return q.promise;
    },

    signup: function(data) {
      var q = $q.defer();

      $http({
        method: 'POST',
        url: 'letsmobile.herokuapp.com/signup',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data,

        transformRequest: function(obj){
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        },
      }).then(function(resp) {
        return q.resolve(resp.data);
      }, function(err) {
        return q.reject(err);
      });
      return q.promise;
    }
  };

  $rootScope.user = u.load();
  return u;
}])

