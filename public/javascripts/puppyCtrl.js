function puppyCtrl($scope, $http){
    $scope.puppies = [];

    $scope.loadPuppies = function(){
        $scope.puppies.push({name : 'Koda', breed : 'Siberian Husky', age : '4'});
        $scope.puppies.push({name : 'Yoda', breed : 'German Shepard', age : '6'});
        $scope.puppies.push({name : 'Ginger', breed : 'Pound Puppy', age : '10'});
        $scope.puppies.push({name : 'Dora', breed : 'Dingo', age : '5'});
    };
    $scope.loadPuppies();

    $scope.puppyForm = {
        name : '',
        breed : '',
        age : ''
    };

    $scope.editPuppy = function(puppy){
        //display Puppy to edit
    };

    $scope.deletePuppy = function(puppy){
        //Remove Puppy
    };

    $scope.submitForm = function(){
        //Add or Update Puppy
    };
}