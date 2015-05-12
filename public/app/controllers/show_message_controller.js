FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){

	  Api.getMessage($routeParams.id).success(function(message){
	    $scope.message = message;
	  });

	  $scope.addReply = function() {
	  	console.log("adding");
	  	  if($scope.newReply.content != '') {
 			   var reply = Api.addReply({
 			   	    content: $scope.newReply.content
 			   },
 			   $routeParams.id)
 			   .success(function (data, status, headers, config) {
			 		$scope.message.Replies.push(data);
              });
	  	  }
	  }
});
