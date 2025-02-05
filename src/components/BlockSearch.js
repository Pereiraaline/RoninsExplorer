import React, { useState } from "react";

const BlockSearch = () => {
  const [blockNumber, setBlockNumber] = useState("");
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState(null);
  const handleSearch = async () => {
    setError(null);
    setBlockData(null);
  
    try {
      const response = await fetch(
        `https://1095-34-95-219-131.ngrok-free.app/block/ledger/${blockNumber}`
      );
  
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
  
      const text = await response.text(); // Lê a resposta como texto primeiro
      console.log("Response body:", text);
  
      // Tenta converter para JSON somente se o conteúdo for JSON válido
      try {
        const data = JSON.parse(text);
        setBlockData(data);
      } catch (jsonError) {
        throw new Error("A resposta não é um JSON válido.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
//   const handleSearch = async () => {
//     setError(null);
//     setBlockData(null);

//     try {
//       const response = await fetch(
//         `https://1095-34-95-219-131.ngrok-free.app/block/ledger/${blockNumber}`
//       );

//       if (!response.ok) {
//         throw new Error("Bloco não encontrado ou erro na API");
//       }

//       const data = await response.json();
//       setBlockData(data);
//     } catch (err) {
//       setError(err.message);
//     }
// };

  return (
    <div className="search">
      <h3>Search Block by Number</h3>
      <input
        type="number"
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
        placeholder="Enter Block Number"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {blockData && (
        <div className="result">
          <h4>Block Information</h4>
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