//declara os controllers do app como um modulo acessivel
angular.module('app.controllers', [])
  
.controller('listaCtrl', ['$rootScope', '$scope', '$stateParams','pessoaFactory', '$state',
function ($rootScope, $scope, $stateParams, pessoaFactory, $state) {

	$scope.deletar = function(id){
		$state.go('menu.deletar',{"id": id});
	}

	$scope.atualizar = function(id){
		$state.go('menu.atualizar',{"id": id});
	}
	
	$scope.$on('$stateChangeSuccess', function (event, toState) {
		if(toState.name == 'menu.lista'){
			pessoaFactory.getLista()
			.success(function(data, status, headers, config){
				$rootScope.lista = data; 
			});
		}
	});
}])

//Controller da pagina cadastro.html
.controller('cadastroCtrl', ['$scope', '$stateParams', 'pessoaFactory', 'voltarHome',
function ($scope, $stateParams, pessoaFactory, voltarHome) {
	$scope.pessoa = {};
	$scope.cadastra = function(){
		pessoaFactory.cadastraPessoa($scope.pessoa)
		.success(function(data, status, headers, config){
			$scope.pessoa = {};
			voltarHome();
		})
		.error(function(error, status, headers, config) {
			console.log(error);
		});
	}
}])
   
//Controller da pagina atualizar.html
.controller('atualizarCtrl', ['$scope', '$stateParams', 'pessoaFactory', 'voltarHome',
function ($scope, $stateParams, pessoaFactory, voltarHome) {
	$scope.$on('$stateChangeSuccess', function (event, toState) {
		if(toState.name == 'menu.atualizar'){
			pessoaFactory.getPessoa($stateParams.id)
			.success(function(data, status, headers, config){
				$scope.pessoa = data;
			})
			.error(function(error, status, headers, config) {
				console.log(error);
			});
		}
	});
	
	//cria a funcao que vai ser chamada quando clicar no botao atualizar na tela
	$scope.atualiza = function(){
		pessoaFactory.atualizaPessoa($scope.pessoa)
		.success(function(data, status, headers, config){
			$scope.pessoa = {};
			voltarHome();
		})
		.error(function(error, status, headers, config) {
			console.log(error);
		});
	}
}])

//Controller da pagina deletar.html
.controller('deletarCtrl', ['$scope', '$stateParams', 'pessoaFactory', 'voltarHome',
function ($scope, $stateParams, pessoaFactory, voltarHome) {
	$scope.$on('$stateChangeSuccess', function (event, toState) {
		if(toState.name == 'menu.deletar'){
			pessoaFactory.getPessoa($stateParams.id)
			.success(function(data, status, headers, config){
				$scope.pessoa = data;
			})
			.error(function(error, status, headers, config) {
				console.log(error);
			});
		}
	});
	
	//cria a funcao que vai ser chamada quando clicar no botao deletar na tela
	$scope.deleta = function(){
		pessoaFactory.deletaPessoa($scope.pessoa._id)
		.success(function(data, status, headers, config){
			$scope.pessoa = {};
			voltarHome();
		})
		.error(function(error, status, headers, config) {
			console.log(error);
		});
	}
}]);
