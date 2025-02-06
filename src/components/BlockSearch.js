import React, { useState } from "react";

const BlockSearch = () => {
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError(null);
    setBlockData(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://1095-34-95-219-131.ngrok-free.app/block/ledger"
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const text = await response.text();
      console.log("Response body:", text);

      // Tenta converter para JSON
      try {
        const data = JSON.parse(text);
        setBlockData(data);
      } catch (jsonError) {
        throw new Error("A resposta não é um JSON válido.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <h3>Consultar Último Bloco</h3>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Carregando..." : "Buscar Bloco"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {blockData && (
        <div className="result">
          <h4>Informações do Bloco</h4>
          <p>
            <strong>Block Number:</strong> {blockData.sequence}
          </p>
          <p>
            <strong>Hash:</strong> {blockData.hash}
          </p>
          <p>
            <strong>Previous Hash:</strong> {blockData.prev_hash}
          </p>
          <p>
            <strong>Ledger Close Time:</strong> {new Date(blockData.closed_at).toLocaleString()}
          </p>
          <p>
            <strong>Transactions Count:</strong> {blockData.transaction_count}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlockSearch;
