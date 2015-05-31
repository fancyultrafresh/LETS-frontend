app.factory('Decision', function($resource){
  return $resource('http://jsonplaceholder.typicode.com/users');
})
.service('LoginService', function($q){
  return {
    loginUser: function(name, pw){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (name == "user" && pw == "secret"){
        deferred.resolve('Welcome ' + name + "!");
      } else {
        deferred.reject('Wrong username and/or password');
      }
      promise.success = function(fn){
        promise.then(fn);
        return promise
      }
      promise.error = function(fn){
        promise.then(null, fn);
        return promise
      }
      return promise;
    }
  }
});
