import http from 'http';
import fs from 'fs';

fs.writeFile('./mensagem.txt', 'Hello World!', 'utf-8', (erro) => {
  if (erro){
    console.log('Falha ao esrevre o arquivo', erro);
    return;
  }
  console.log('Arquivo foi criado com sucesso');
});

fs.readFile('./mensagem.txt', 'utf-8', (erro, conteudo) => {
  if (erro){
    console.log('Falha ao ler o arquivo', erro);
    return;
  }

  console.log(`Conteúdo do arquivo: ${conteudo}`);
  
  iniciarServidorHttp(conteudo);
});

function iniciarServidorHttp(mensagem){
  const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(mensagem)
  });
  
  const porta = 3000;
  const host = 'localhost';
  
  servidor.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}/`);
  });
}