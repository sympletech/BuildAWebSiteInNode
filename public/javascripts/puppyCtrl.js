function puppyCtrl($scope, $http){
    $scope.puppies = [];

    $scope.loadPuppies = function(){
        $http.get('/puppyApi').success(function(data){
            $scope.puppies = data;
        });
    };
    $scope.loadPuppies();

    $scope.puppyForm = {};
    var resetForm = function(){
        $scope.puppyForm = {
            _id : '',
            name : '',
            breed : '',
            age : ''
        };
    };
    resetForm();

    $scope.editPuppy = function(puppy){
        $http.get('/puppyApi/' + puppy._id).success(function(data){
            $scope.puppyForm = data;
        });
    };

    $scope.deletePuppy = function(puppy){
        $http.delete('/puppyApi/' + puppy._id).success(function(data){
            $scope.loadPuppies();
        });
    };

    $scope.submitForm = function(){
        $http.post('/puppyApi/', $scope.puppyForm).success(function(data){
            $scope.loadPuppies();
            resetForm();
        });
    };
}