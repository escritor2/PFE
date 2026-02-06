// Exercício 1: Verificador de Turno e Prioridade
// Contexto: Na sua agenda, cada tarefa tem uma hora (0-23) e um nível de prioridade (1
// a 10). Tarefa: Escreva um script que:
// 1. Receba a hora e a prioridade.
// 2. Verifique se a hora está entre 0 e 11 (Manhã), 12 e 17 (Tarde) ou 18 e 23
// (Noite).
// 3. Use um operador lógico para imprimir “TAREFA CRÍTICA/URGENTE” se a
// prioridade for maior que 8 E o turno for "Manhã" ou “Tarde”.
// 4. Use um operador lógico para imprimir “TAREFA IMPORTANTE” se a prioridade
// for maior ou igual a 7 e menor que 9 E o turno for “Manhã” ou“Tarde”.
// 5. Use um operador lógico para imprimir “TAREFA NÃO IMPORTANTE”
// independentemente da prioridade E o turno for “Noite”. Esta agenda valoriza as
// noites para lazer e não para tarefas.
// 6. Imprima "Horário Inválido" caso o número esteja fora de 0-23 e “Nível de
// Prioridade Inválida” caso o número esteja fora de 1-10.

function verificarTarefa(hora, prioridade) {
    
    if (hora < 0 || hora > 23) {
        console.log("Horário Inválido");
        return;
    }
    if (prioridade < 1 || prioridade > 10) {
        console.log("Nível de Prioridade Inválida");
        return;
    }

    let turno = "";
    if (hora >= 0 && hora <= 11) {
        turno = "Manhã";
    } else if (hora >= 12 && hora <= 17) {
        turno = "Tarde";
    } else {
        turno = "Noite";
    }

    
    if (turno === "Noite") {
        console.log("TAREFA NÃO IMPORTANTE");
    } 
    else if (prioridade > 8 && (turno === "Manhã" || turno === "Tarde")) {
        console.log("TAREFA CRÍTICA/URGENTE");
    }
    
    else if (prioridade >= 7 && prioridade < 9 && (turno === "Manhã" || turno === "Tarde")) {
        console.log("TAREFA IMPORTANTE");
    }
    else {
        console.log("Tarefa de rotina (Prioridade Baixa/Média)");
    }
}
const hora = prompt("HORA");
const prioridade = prompt("PRIORIDADE");

verificarTarefa(parseInt(hora), parseInt(prioridade));
