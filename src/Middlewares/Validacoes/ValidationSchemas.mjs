export const validacaoUsuarioSchema = {
 primeiro_nome: {
  isLength: {
   options: { min: 3, max: 40 },
   errorMessage: "Nome de usuário deve conter no mínimo 3 caracteres e no máximo 40"
  },
  notEmpty: {
   errorMessage: "Nome de usuário não pode estar vazio"
  },
  isString: true,
 },
 sobrenome: {
  isLength: {
   options: { min: 3, max: 40 },
   errorMessage: "Nome de usuário deve conter no mínimo 3 caracteres e no máximo 40"
  },
  notEmpty: {
   errorMessage: "Nome de usuário não pode estar vazio"
  },
  isString: true,
 },
 email: {
  isEmail: true,
 },
};

export const validacaoRecheioSchema = {
 nome: {
  notEmpty: {
   errorMessage: "Nome do recheio não pode estar vazio"
  },
  isString: true,
  isLength: {
   options: { min: 3, max: 40 },
   errorMessage: "Nome de usuário deve conter no mínimo 3 caracteres e no máximo 40"
  },
 },
}

export const validacaoProdutoEstoqueSchema = {
 nome: {
  isString: {
   errorMessage: "Nome precisa ser um texto"
  },
  notEmpty: {
   errorMessage: "Nome do produto não pode estar vazio"
  },
  isLength: {
   options: { min: 3, max: 40 },
   errorMessage: "Nome de usuário deve conter no mínimo 3 caracteres e no máximo 40"
  },
 },
 descricao: {
  isString: {
   errorMessage: "Descrição precisa ser um texto"
  },
 },
 preco: {
  isNumeric: {
   errorMessage: "Valor precisa ser numérico"
  },
  notEmpty: {
   errorMessage: "Preço não pode estar vazio"
  },
 },
 quantidade_estoque: {
  isNumeric: true,
  notEmpty: {
   errorMessage: "Quantidade não pode estar vazio"
  },
 },
}

export const validacaoProdutoVendaSchema = {
 nome: {
  isString: {
   errorMessage: "Nome precisa ser um texto"
  },
  notEmpty: {
   errorMessage: "Nome do produto não pode estar vazio"
  },
  isLength: {
   options: { min: 3, max: 40 },
   errorMessage: "Nome de usuário deve conter no mínimo 3 caracteres e no máximo 40"
  },
 },
 descricao: {
  isString: {
   errorMessage: "Descrição precisa ser um texto"
  },
 },
 peso: {
  isNumeric: {
   errorMessage: "Valor precisa ser numérico"
  },
  notEmpty: {
   errorMessage: "Peso não pode estar vazio"
  },
 },
 preco: {
  isNumeric: {
   errorMessage: "Valor precisa ser numérico"
  },
  notEmpty: {
   errorMessage: "Preço não pode estar vazio"
  },
 },
}