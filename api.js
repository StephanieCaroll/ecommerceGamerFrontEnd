const API_URL = 'http://localhost:3000/produtos';

export async function getProdutos() {
  const response = await fetch(API_URL);
  return response.json(); 
}

export async function addProduto(produto) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto), 
  });
  return response.json();
}
