import { Pessoa } from '../pessoas/pessoa';
import { Categoria } from './../categorias/categoria';

export class Lancamento {
	id: number;
	tipo = "RECEITA";
	dataVencimento: Date;
	dataPagamento: Date;
	descricao: string;
	valor: number;
	observacao: string;
	pessoa = new Pessoa();
	categoria = new Categoria();
}
