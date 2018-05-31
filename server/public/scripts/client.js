let myApp = angular.module( 'myApp', [] );

myApp.controller( 'LaunchpadController', ['$http', function($http){
    // use "vm" as the name in script
    let vm = this;
    vm.movies = [];
    // use nickname in HTML

    // simple click event
    vm.testClick = function(){
        console.log( 'test click' );
    } // end testClick

    vm.getMovie = function(){
        
        //put the title from the form into an object to send as data in POST
        let newMovie = {
            title: vm.movieIn
        }
        
        $http({
            method: 'POST',
            url: '/movie',
            data: newMovie
        }).then(function(response){
            console.log('Sent movie to the server');
            vm.requestMovies();
            vm.movieIn = '';
        }).catch(function(error){
            console.log('Error adding movie in POST');
        });
        
        
    } // end getMovie

    vm.removeMe = function( index ){
        console.log( 'in removeMe:', index );
        let movieToDelete = vm.movies[index];
        $http({
            method: 'DELETE',
            url: `/movie?id=${movieToDelete.id}`
        }).then(function(response){
            console.log('Delete movie', movieToDelete );
            vm.requestMovies();
        }).catch(function(error){
            console.log('Error deleting movie:', error );
        })
    } // end removeMe

    vm.requestMovies = function(){
        $http({
            method: 'GET',
            url: '/movie'
        }).then(function(response){
            console.log(`Got response from the server:`, response.data);
            vm.movies = response.data;
            console.log( 'your movies:', vm.movies );
        }).catch(function(error){
            console.log(`Error getting movies: ${error}`);
        });
    }

    //GET the movies when the controller loads
    console.log('LaunchpadController is created');
    vm.requestMovies();

}]); // end controller