import React, { useState, useEffect } from "react";
import "./module_tableView.css";

export default function TableView() {
  const [entradas, setEntradas] = useState([]);
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const formsFromStorage = JSON.parse(localStorage.getItem("formData")) || [];
    
    const entradasFiltradas = formsFromStorage.filter(
      (form) => {return form.tipo === "entrada"}
    );
    const despesasFiltradas = formsFromStorage.filter(
      (form) => {return form.tipo === "despesa"}
    );

    setEntradas(entradasFiltradas);
    setDespesas(despesasFiltradas);
  }, []);

  const handleDelete = (index, tipo) => {
    if (tipo === "entrada") {
      const updatedEntradas = [...entradas];
      updatedEntradas.splice(index, 1);
      setEntradas(updatedEntradas);
      localStorage.setItem("formData", JSON.stringify(updatedEntradas.concat(despesas)));
    } else {
      const updatedDespesas = [...despesas];
      updatedDespesas.splice(index, 1);
      setDespesas(updatedDespesas);
      localStorage.setItem("formData", JSON.stringify(entradas.concat(updatedDespesas)));
    }
  };

  return (
    <div className="box2">
      <div className="table_box">
        <h1>Entradas</h1>
        <div className="entradas">
          {entradas.length > 0 ? (
            entradas.map((entrada, index) => (
              <div key={index}>
                <p>Tipo: {entrada.tipo}</p>
                <p>Nome: {entrada.nome}</p>
                <p>Valor: {entrada.valor}</p>
                <p>Tipo de Pagamento: {entrada.tipoPagamento}</p>
                <button onClick={() => handleDelete(index, "entrada")}>Excluir</button>
              </div>
            ))
          ) : (
            <p>Nenhuma entrada registrada.</p>
          )}
        </div>
      </div>

      <div className="table_box">
        <h1>Despesas</h1>
        <div className="despesas">
          {despesas.length > 0 ? (
            despesas.map((despesa, index) => (
              <div key={index}>
                <p>Tipo: {despesa.tipo}</p>
                <p>Nome: {despesa.nome}</p>
                <p>Valor: {despesa.valor}</p>
                <p>Tipo de Pagamento: {despesa.tipoPagamento}</p>
                <button onClick={() => handleDelete(index, "despesa")}>Excluir</button>
              </div>
            ))
          ) : (
            <p>Nenhuma despesa registrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
