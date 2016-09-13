//Declara os 'serviços' usados pelo app como um modulo acessivel
angular.module('app.services', [])

.factory('voltarHome', ['$ionicHistory', '$state', function($ionicHistory, $state){
	return function(){
		$ionicHistory.nextViewOptions({
				disableBack: true
		});
		$state.go('menu.lista');
	}
}])

//Servico que disponibiliza metodos de requisição de dados para o servidor
.factory('pessoaFactory', ['$http',function( $http){
	return {
		getLista: function() {
            return $http.get('http://localhost:8081/api/pessoa');
        },
        getPessoa: function(id) {
            return $http.get('http://localhost:8081/api/pessoa/'+id);
        },
		deletaPessoa: function(id) {
            return $http.delete('http://localhost:8081/api/pessoa/'+id);
        },
		atualizaPessoa: function(pessoa) {
			var data = {obj: JSON.stringify(pessoa)};
            return $http.put('http://localhost:8081/api/pessoa/'+pessoa._id, data,{"headers": {"content-type": "application/json"}});
        },
		cadastraPessoa: function(pessoa) {
			var data = {obj: JSON.stringify(pessoa)};
            return $http.post('http://localhost:8081/api/pessoa', data,{"headers": {"content-type": "application/json"}});
        }
		
    };
}]);