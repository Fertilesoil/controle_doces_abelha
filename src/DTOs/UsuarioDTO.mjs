export class Usuario {
  id
  primeiro_nome
  sobrenome
  email

  constructor(id, primeiro_nome, sobrenome, email) {
    this.id = id;
    this.primeiro_nome = primeiro_nome;
    this.sobrenome = sobrenome;
    this.email = email;
  }
}