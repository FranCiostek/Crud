//Declara as rotas usados pelo app como um modulo acessivel
angular.module('app.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('menu.lista', {
    url: '/lista',
    views: {
      'crudApp': {
        templateUrl: 'templates/lista.html',
        controller: 'listaCtrl'
      }
    }
  })
  .state('menu', {
    url: '/crudApp',
    templateUrl: 'templates/menu.html',
    abstract:true
  })
  .state('menu.cadastro', {
    url: '/cadastro',
    views: {
      'crudApp': {
        templateUrl: 'templates/cadastro.html',
        controller: 'cadastroCtrl'
      }
    }
  })
  .state('menu.atualizar', {
    url: '/atualizar/:id',
    views: {
      'crudApp': {
        templateUrl: 'templates/atualizar.html',
        controller: 'atualizarCtrl'
      }
    }
  })
  .state('menu.deletar', {
    url: '/deletar/:id',
    views: {
      'crudApp': {
        templateUrl: 'templates/deletar.html',
        controller: 'deletarCtrl'
      }
    }
  })
  
//Seta a pagina inicial
$urlRouterProvider.otherwise('/crudApp/lista')
});