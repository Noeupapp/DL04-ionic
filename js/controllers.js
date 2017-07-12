angular.module('starter.controllers', [])

.controller('MotionCtrl', function($scope,$cordovaDeviceMotion) {

      var options = { frequency: 500 };

  document.addEventListener("deviceready", function () {

    var watch = $cordovaDeviceMotion.watchAcceleration(options);

        watch.then(
          null,
          function(error) {
          // An error occurred
          },
          function(result) {
            $scope.r = Math.floor((result.x+10)*255/20);
            $scope.g = Math.floor((result.y+10)*255/20);
            $scope.b = Math.floor((result.z+10)*255/20);
            $scope.colorProp = {'background-color':"rgb("+$scope.r+","+$scope.g+","+$scope.b+")"};
        });

      }, false);







      $scope.getAccel = function(){
        $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
              $scope.x = result.x;
              $scope.y = result.y;
              $scope.z = result.z;

        }, function(err) {
          alert("Erreur")
        });
      }

})

.controller('WhereamiCtrl', function($scope) {

})


.controller('PostsCtrl', function($scope) {
})

.controller('LsCtrl', function($scope,$window) {
  if($window.localStorage.getItem("savedWord") != null) $scope.mot = $window.localStorage.getItem("savedWord")
  $scope.save = function(mot){
    //save ici
    $window.localStorage.setItem("savedWord",mot)
  }

});
