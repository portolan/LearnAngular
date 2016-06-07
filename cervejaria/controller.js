angular
   .module('App')
   .controller('CervejariaController', function($scope, $http){

     var API = 'http://www.munif.com.br/bereja/api/cervejaria';

     $scope.listarCervejarias = function(){
       $scope.loading = true;
        $http.get(API)
          .then(function(response){
              $scope.cervejarias = response.data;
              $scope.loading = false;
          })
     }
     $scope.listarCervejarias();

     $scope.salvarCervejaria = function(cervejaria) {
         $scope.loading = true;
         var novaCervejaria = angular.copy(cervejaria);
         if (cervejaria.id){
             $http.put(API + '/' + cervejaria.id, novaCervejaria)
                .then(function(response){
                  $scope.listarCervejarias();
                })
         } else {
           $http.post(API, novaCervejaria)
             .then(function(response){
               $scope.listarCervejarias()
             })
         }
         $scope.cervejaria = {};
     }

     $scope.popularForm = function(cervejaria){
       $scope.cervejaria = angular.copy(cervejaria);
     }

     $scope.deletarCervejaria = function(cervejaria){
       if (confirm("Tem certeza que deseja remover a cervejaria: "+cervejaria.nome+"?")){
         $scope.loading = true;
          $http.delete(API + '/' + cervejaria.id)
             .then(function(response){
                  $scope.listarCervejarias()
             })
       }
     }


   });
