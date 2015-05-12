FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
  // Toteuta kontrolleri tähän

    Api.getTopic($routeParams.id).success(function(topic){
    	console.log("VIESTEI:");
    	console.log(topic.Messages);
        $scope.topic = topic;
    });


    $scope.addMessage = function() {
    	if($scope.newMessage.title != '' && $scope.newMessage.content != '') {
    		var message = Api.addMessage({
    			title: $scope.newMessage.title,
    			content: $scope.newMessage.content
    		},
    		$routeParams.id)
    		.success(function (data, status, headers, config) {
                  $location.path('/messages/' + data.id)
            });
    	}
    }
});