export default function rotas(req, res, dado) {
  const { conteudo } = dado;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(conteudo);
}