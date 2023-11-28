import React, { useState, useEffect } from "react";
import "./module_formulario.css"

export default function Formulario() {
  const [tipo, setTipo] = useState("despesa");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("");
  const [formulariosSalvos, setFormulariosSalvos] = useState([]);

  useEffect(() => {
    const formsFromStorage = JSON.parse(localStorage.getItem("formData"));
    if (formsFromStorage) {
      setFormulariosSalvos(formsFromStorage);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      tipo,
      nome,
      valor,
      tipoPagamento,
    };

    // Atualizar o estado com os formulários salvos anteriormente e adicionar o novo formulário
    const updatedForms = [...formulariosSalvos, formData];

    // Salvar no localStorage
    localStorage.setItem("formData", JSON.stringify(updatedForms));

    // Atualizar o estado para limpar o formulário
    setFormulariosSalvos(updatedForms);
    setTipo("");
    setNome("");
    setValor("");
    setTipoPagamento("");

    window.location.reload();
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Tipo:
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="despesa">Despesa</option>
              <option value="entrada">Entrada</option>
            </select>
          </label>
        </div>
        <div>
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
          <label>
            Tipo de Pagamento:
            <input
              type="text"
              value={tipoPagamento}
              onChange={(e) => setTipoPagamento(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
