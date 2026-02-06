// Exercício 3: Formatador de Nomes para a Agenda
// Contexto: Usuários costumam digitar nomes de contatos de qualquer jeito (com
// espaços extras ou letras minúsculas). Tarefa: Crie uma função chamada
// limparNomeContato(nome) que:
// 1. Receba uma string (ex: " joão silva ").
// 2. Remova os espaços em branco no início e no fim.
// 3. Transforme toda a string em letras maiúsculas.
// 4. Retorne a string formatada.
// 5. Bônus: Use o método split() e length para contar quantas palavras o nome
// possui.

function limparNomeContato(nome) {
    const nomeLimpo = nome.trim().toUpperCase();
    const palavras = nomeLimpo.split(" ");
    console.log(`Nome formatado: ${nomeLimpo}`);
    console.log(`Número de palavras: ${palavras.length}`);
    return nomeLimpo;
}