import React, { useState, useEffect } from "react";
import "./module_tableView.css";

export default function TableView() {
  // Estado para armazenar entradas e despesas
  const [entradas, setEntradas] = useState([]);
  const [despesas, setDespesas] = useState([]);

  // Efeito para carregar dados do armazenamento local no início
  useEffect(() => {
    // Obtém os dados do localStorage ou inicializa um array vazio
    const formsFromStorage = JSON.parse(localStorage.getItem("formData")) || [];
    
    // Filtra os dados para entradas e despesas
    const entradasFiltradas = formsFromStorage.filter(
      (form) => {return form.tipo === "entrada"}
    );
    const despesasFiltradas = formsFromStorage.filter(
      (form) => {return form.tipo === "despesa"}
    );

    // Define os estados das entradas e despesas filtradas
    setEntradas(entradasFiltradas);
    setDespesas(despesasFiltradas);
  }, []);

  // Função para deletar uma entrada ou despesa com base no índice e tipo
  const handleDelete = (index, tipo) => {
    if (tipo === "entrada") {
      // Atualiza as entradas após a exclusão
      const updatedEntradas = [...entradas];
      updatedEntradas.splice(index, 1);
      setEntradas(updatedEntradas);

      // Atualiza o localStorage com as entradas e despesas restantes
      localStorage.setItem("formData", JSON.stringify(updatedEntradas.concat(despesas)));
    } else {
      // Atualiza as despesas após a exclusão
      const updatedDespesas = [...despesas];
      updatedDespesas.splice(index, 1);
      setDespesas(updatedDespesas);

      // Atualiza o localStorage com as entradas e despesas restantes
      localStorage.setItem("formData", JSON.stringify(entradas.concat(updatedDespesas)));
    }
  };

  return (
    <div className="box2">
      <div className="table_box">
        <h1>Entradas</h1>
        <div className="entradas">
          {entradas.length > 0 ? (
            // Mapeia e exibe as entradas existentes
            entradas.map((entrada, index) => (
              <div className="card" key={index}>
                <p>Tipo: {entrada.tipo}</p>
                <p>Nome: {entrada.nome}</p>
                <p>Valor: {entrada.valor}</p>
                <p>Tipo de Pagamento: {entrada.tipoPagamento}</p>
                {/* Botão para excluir a entrada correspondente */}
                <button onClick={() => handleDelete(index, "entrada")}>Excluir</button>
              </div>
            ))
          ) : (
            // Se não houver entradas, exibe uma mensagem
            <p>Nenhuma entrada registrada.</p>
          )}
        </div>
      </div>

      <div className="table_box">
        <h1>Despesas</h1>
        <div className="despesas">
          {despesas.length > 0 ? (
            // Mapeia e exibe as despesas existentes
            despesas.map((despesa, index) => (
              <div className="card" key={index}>
                <p>Tipo: {despesa.tipo}</p>
                <p>Nome: {despesa.nome}</p>
                <p>Valor: {despesa.valor}</p>
                <p>Tipo de Pagamento: {despesa.tipoPagamento}</p>
                {/* Botão para excluir a despesa correspondente */}
                <button onClick={() => handleDelete(index, "despesa")}>Excluir</button>
              </div>
            ))
          ) : (
            // Se não houver despesas, exibe uma mensagem
            <p>Nenhuma despesa registrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

