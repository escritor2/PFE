// Exercício 2: Calculadora de Gastos Mensais
// Contexto: Você quer adicionar uma função financeira à agenda para calcular quanto
// sobra do salário após as contas. Tarefa: Crie um script que:
// 1. Receba as variáveis salario, aluguel, alimentacao e lazer.
// 2. Calcule o total de despesas e o saldo restante usando operadores aritméticos.
// 3. Use uma estrutura if/else para exibir:
// o "Saldo Positivo" se o saldo for maior que 0.
// o "No Limite" se o saldo for exatamente 0.
// o "Saldo Negativo" se o saldo for menor que 0.

 
function calcularGastos(salario, aluguel, alimentacao, lazer) {
    const totalDespesas = aluguel + alimentacao + lazer;
    const saldoRestante = salario - totalDespesas;
    if (saldoRestante > 0) {
        console.log("Saldo Positivo");
    } else if (saldoRestante === 0) {
        console.log("No Limite");
    }
    else {
        console.log("Saldo Negativo");
    }
    console.log(`Total de Despesas: R$${totalDespesas.toFixed(2)}`);
    console.log(`Saldo Restante: R$${saldoRestante.toFixed(2)}`);
}
const salario = parseFloat(prompt("Salário:"));
const aluguel = parseFloat(prompt("Aluguel:"));
const alimentacao = parseFloat(prompt("Alimentação:"));
const lazer = parseFloat(prompt("Lazer:"));