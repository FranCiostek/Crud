
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PessoaSchema   = new Schema({
	nome: String,
	sobreNome: String,
	dataNascimento: String,
	email: String,
	telefone: String
});

module.exports = mongoose.model('Pessoa', PessoaSchema);