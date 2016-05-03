angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $cordovaBarcodeScanner, $http) {
  $scope.scan = function() {
    document.addEventListener("deviceready", function () {
      $scope.scanResults = '';
      $scope.response = '';
      $cordovaBarcodeScanner
      .scan()
      .then(function(result) {
        // Success! Barcode data is here
        // $scope.scanResults = "We got a barcoden" +
        // "Result: " + result.text + "n" +
        // "Format: " + result.format + "n" +
        // "Cancelled: " + result.cancelled;

        // get subject_id first
        // get student_id from qr // result.text
        // POST to database
        $scope.scanResults = result.text;
        var link = 'http://kembara.my/check.php';
        $scope.formData = {matapelajaran_id : 12, matrik_no: result.text};

        $http.post(link, $scope.formData).then(function (res) {
            $scope.response = res.data;
        });
      }, function(error) {
        // An error occurred
        $scope.scanResults = 'Error: ' + error;
      });
    }, false);
  };

  $scope.clear = function() {
    $scope.scanResults = '';
    $scope.response = '';
  }

  $scope.scanResults = '';
  $scope.response = '';
  $scope.formData = {};
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
