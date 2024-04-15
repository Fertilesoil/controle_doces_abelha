import { test, expect, describe } from "vitest";
import RecheioRepository from "../RecheioRepository.mjs";

describe("Recheio Repository", () => {

  // test("Deve ser possível criar um novo recheio", async () => {

  //   const resultado = await RecheioRepository.cadastrar({
  //     nome: "Beard"
  //   })
  // .then(resultado => expect(resultado).toHaveProperty('id'));

  //   expect(resultado).toHaveProperty('id')
  //   expect(resultado.nome).toBe("Beard")
  // });

  // test('Não deve ser possível criar um usuário já existente', async () => {

  //   await RecheioRepository.cadastrar({
  //     nome: "Clarice Falcon"
  //   });

  //   expect(async () => {
  //     await RecheioRepository.cadastrar({
  //       nome: "Clarice Falcon"
  //     })
  //   }).rejects.toThrow();
  // })

  // test('Deve retornar um array com todos os recheios', async () => {

  //   const recheios = await RecheioRepository.listar();

  //   expect(recheios).toHaveLength(7);
  // });

  // test('Deve retornar um recheio dado um id', async () => {

  //   const recheioPorID = await RecheioRepository.listarPorId('abbef1ad-bbc7-402e-92ff-b81e7e6a7497');

  //   const produtoBuscado = {
  //     id: "abbef1ad-bbc7-402e-92ff-b81e7e6a7497",
  //     nome: "Clarice Falcon"
  //   }
  //   expect(recheioPorID).toEqual(produtoBuscado);

  // })

  test('Não deve retornar um recheio dado um id inexistente', async () => {

    const recheioPorID = await RecheioRepository.listarPorId('abbef1ad-bb57-402e-92ff-b81e7e6a7497');

    expect(recheioPorID).toBeNull();
  })
});

