import http from 'http';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import rotas from './routes.js';
import { sequelize, criarProduto, leProdutos } from './models.js';

const db = new sqlite3.Database('./tic.db', (erro) => {
  if (erro) {
    console.log('Falha ao conectar ao banco de dados');
    return;
  }

  console.log('Banco de dados inicializado com sucesso');
});

fs.writeFile('./mensagem.txt', 'Hello Fille!', 'utf-8', (erro) => {
  if (erro) {
    console.log('Falha ao escrever o arquivo', erro);
    return;
  }
  console.log('Arquivo foi criado com sucesso');
});

fs.readFile('./mensagem.txt', 'utf-8', (erro, conteudo) => {
  if (erro) {
    console.log('Falha ao ler o arquivo', erro);
    return;
  }

  console.log(`Conteúdo do arquivo: ${conteudo}`);

  iniciarServidorHttp(conteudo);
});

async function iniciarServidorHttp(conteudo) {
  await sequelize.sync();

  await criarProduto({nome: 'Açaí Tradicional', preco: 10.50});
  await criarProduto({nome: 'Açaí com Granola', preco: 12.50});
  await leProdutos();

  const servidor = http.createServer((req, res) => {
    rotas(req, res, { conteudo });
  });

  const porta = 3000;
  const host = 'localhost';

  servidor.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}/`);
  });
}