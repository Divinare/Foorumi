FoorumApp.controller('UsersController', function($scope, $location, Api){
  

	$scope.login = function() {
		console.log("logging in!");
		if($scope.password != '' && $scope.username != '') {  
			Api.login({
				username: $scope.username,
				password: $scope.password
			})
	       .success(function(user){
		    	$location.path('/');
			})
		    .error(function(){
			    $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
			});
		}
    }

    $scope.register = function() {
    	console.log("registering");
    	if($scope.username == '' || $scope.password == '') {
    		$scope.errorMessage = 'Käyttäjätunnus ja salasana täytyy laittaa!';
    	} else if($scope.password != $scope.confirm_password) {
    		$scope.errorMessage = 'Salasana ja salasanan vahvistus eivät täsmää';
    	} else {
    		Api.register({
				username: $scope.username,
				password: $scope.password
    		})
	       .success(function(user){
		    	$location.path('/');
			})
		    .error(function(){
			    $scope.errorMessage = 'Rekisteröitymineen ei onnistunut';
			});


    	}


    }


});
