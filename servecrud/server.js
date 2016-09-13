//Declara variaveis
var mongoose    = require('mongoose');
var pessoaModel = require('./model/pessoa');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var port        = 8081;

//Configura caminho do banco mongoDB
mongoose.connect('mongodb://localhost:27017/cadastro');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router      = express.Router();

//Configura todos os requests recebidos
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Methods", "DELETE,GET,PUT,POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
	
    console.log('Requisição recebida'); 
    next(); 	
});

router.get('/', function(req, res) {
    res.json({ mensagem: 'Tudo funcionando aqui, e ai?' });   
});

router.route('/pessoa')
	.get(function(req, res) {
		pessoaModel.find(function(err, pessoas) {
            if (err)
                res.send(err);
	
            res.json(pessoas);
        });
	})
	
	.post(function(req, res) {
		var pessoa = new pessoaModel(JSON.parse(req.body.obj));
		console.log(pessoa);
		pessoa.save(function(err) {
            if (err){
                res.send(err);
			}
            res.json({mensagem : "Pessoa Cadastrada"});
        });
	});
	
router.route('/pessoa/:pessoa_id')
	.get(function(req, res) {
		pessoaModel.findById(req.params.pessoa_id, function(err, pessoa) {
            if (err){
                res.send(err);
			}
            res.json(pessoa);
        });
	})
	
	.put(function(req, res) {
	    pessoaModel.findById(req.params.pessoa_id, function(err, pessoa) {
            if (err){
                res.send(err);
			}
			console.log(req.body);
	        var pessoaTemp = JSON.parse(req.body.obj);
			
			//Atualiza os dados
			pessoa.nome           = pessoaTemp.nome;
			pessoa.sobreNome      = pessoaTemp.sobreNome;
			pessoa.dataNascimento = pessoaTemp.dataNascimento;
			pessoa.email          = pessoaTemp.email;
			pessoa.telefone       = pessoaTemp.telefone;
			
            //Salva os dados alterados
            pessoa.save(function(err) {
                if (err){
                    res.send(err);
				}
                res.json({ mensagem: 'Cadastro atualizado' });
            });
        });
	})
	
.delete(function(req, res) {
		pessoaModel.remove(
			{_id: req.params.pessoa_id},
			function(err, bear) {
				if (err){
					res.send(err);
				}
				res.json({ mensagem: 'Cadastro Deletado' });
			}
		);
	});

	


app.use('/api', router);

//Inicia o servidor
app.listen(port);
console.log('Servidor rodando, acesse http://localhost:' + port + '/api/ e veja a magica acontecer');