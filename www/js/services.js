app.factory('Decision', function($resource){
  return $resource('http://jsonplaceholder.typicode.com/users');
});
