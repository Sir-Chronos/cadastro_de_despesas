import React, { useState, useEffect } from "react";
import "./module_formulario.css";

export default function Formulario() {
  // Definição dos estados para os campos do formulário e os formulários salvos
  const [tipo, setTipo] = useState("despesa");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("");
  const [formulariosSalvos, setFormulariosSalvos] = useState([]);

  // Efeito para carregar dados do armazenamento local no início
  useEffect(() => {
    // Obtém os dados do localStorage, se houver
    const formsFromStorage = JSON.parse(localStorage.getItem("formData"));
    if (formsFromStorage) {
      // Define os formulários salvos no estado
      setFormulariosSalvos(formsFromStorage);
    }
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    // Cria um objeto com os dados do formulário atual
    const formData = {
      tipo,
      nome,
      valor,
      tipoPagamento,
    };

    // Atualiza o estado com os formulários salvos e adiciona o novo formulário
    const updatedForms = [...formulariosSalvos, formData];

    // Salva no localStorage os formulários atualizados
    localStorage.setItem("formData", JSON.stringify(updatedForms));

    // Atualiza o estado para limpar o formulário e os campos
    setFormulariosSalvos(updatedForms);
    setTipo("despesa");
    setNome("");
    setValor("");
    setTipoPagamento("");

    // Recarrega a página para exibir os dados atualizados (poderia ser feito de outra forma, isso é só um exemplo)
    window.location.reload();
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div>
          {/* Campo para selecionar o tipo (despesa ou entrada) */}
          <label>
            Tipo:
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="despesa">Despesa</option>
              <option value="entrada">Entrada</option>
            </select>
          </label>
        </div>
        <div>
          {/* Campo para inserir o nome */}
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
        </div>
        <div>
          {/* Campo para inserir o valor */}
          <label>
            Valor:
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </label>
        </div>
        <div>
          {/* Campo para inserir o tipo de pagamento */}
          <label>
            Tipo de Pagamento:
            <input
              type="text"
              value={tipoPagamento}
              onChange={(e) => setTipoPagamento(e.target.value)}
            />
          </label>
        </div>
        {/* Botão para enviar o formulário */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
