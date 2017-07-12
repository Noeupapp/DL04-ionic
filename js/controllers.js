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

.controller('WhereamiCtrl', function($scope,$cordovaGeolocation) {
    var map;
    var nantes = {lat: 47.218371, lng: -1.553621};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: nantes
    });


    $scope.getPos = function(){
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var marker = new google.maps.Marker({
              position: {lat: position.coords.latitude, lng: position.coords.longitude},
              map: map
            });
          }, function(err) {
            alert("error");
          });
    }

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
