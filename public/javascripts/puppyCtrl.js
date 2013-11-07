function puppyCtrl($scope, $http){
    $scope.puppies = [];

    $scope.loadPuppies = function(){
        $scope.puppies.push({_id:1, name : 'Koda', breed : 'Siberian Husky', age : '4'});
        $scope.puppies.push({_id:2, name : 'Yoda', breed : 'German Shepard', age : '6'});
        $scope.puppies.push({_id:3, name : 'Ginger', breed : 'Pound Puppy', age : '10'});
        $scope.puppies.push({_id:4, name : 'Dora', breed : 'Dingo', age : '5'});
    };
    $scope.loadPuppies();

    $scope.puppyForm = {};;
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
        $scope.puppyForm = angular.copy(puppy);
    };

    $scope.deletePuppy = function(puppy){
        $scope.puppies = _.reject($scope.puppies, function(p){
            return p._id === puppy._id;
        });
    };

    $scope.submitForm = function(){
        var existing = _.find($scope.puppies, function(p){
            return p._id == $scope.puppyForm._id;
        });

        if(existing != null){
            var i = _.indexOf($scope.puppies, existing);
            $scope.puppies[i] = angular.copy($scope.puppyForm);
        }else{
            $scope.puppies.push(angular.copy($scope.puppyForm));
        }
        resetForm();
    };
}