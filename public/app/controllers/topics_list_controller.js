FoorumApp.controller('TopicsListController', function($scope, $location, Api){

    Api.getTopics().success(function(topics){
        $scope.topics = topics
    });

    $scope.addTopic = function() {
         console.log("trying to add topic");
         if($scope.newTopic.name != '' && $scope.newTopic.description != '') {
              var topic = Api.addTopic({
                   name: $scope.newTopic.name,
                   description: $scope.newTopic.description
              })        
              .success(function (data, status, headers, config) {
                  $location.path('/topics/' + data.id)
              });

         }
    }

});
