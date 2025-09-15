document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-conversor");
  const inputValue = document.querySelector(".input-value");
  const moedaOrigem = document.getElementById("moeda-origem");
  const moedaDestino = document.getElementById("moeda-destino");
  const divResultado = document.getElementById("Div-value");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // bloqueia atualização da página

    const valor = parseFloat(inputValue.value);
    const de = moedaOrigem.value.toUpperCase();
    const para = moedaDestino.value.toUpperCase();

    if (!valor || !de || !para) {
      divResultado.innerText = "⚠️ Por favor, preencha todos os campos!";
      return;
    }

    if (de === para) {
      divResultado.innerText = `Mesmo valor: ${valor.toFixed(2)} ${para}`;
      return;
    }

    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${de}-${para}`
      );

      if (!response.ok) {
        divResultado.innerText = "⚠️ Erro ao acessar a API!";
        return;
      }

      const data = await response.json();

      // monta a chave certa (ex: USDBRL)
      const key = `${de}${para}`;

      if (!data[key] || !data[key].bid) {
        divResultado.innerText = "⚠️ Cotação não encontrada!";
        return;
      }

      const taxa = parseFloat(data[key].bid);
      const valorConvertido = valor * taxa;

      divResultado.innerText = `✅ ${valorConvertido.toFixed(2)} ${para}`;
    } catch (error) {
      divResultado.innerText = "⚠️ Erro ao buscar a cotação!";
    }
  });
});