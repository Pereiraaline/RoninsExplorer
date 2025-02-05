// import React, { useState } from "react";

// const TransactionSearch = () => {
//   const [transactionHash, setTransactionHash] = useState("");
//   const [transactionData, setTransactionData] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     setError(null);
//     setTransactionData(null);

//     try {
//       const response = await fetch(
//         `https://1095-34-95-219-131.ngrok-free.app/transaction/hash_key/${transactionHash}`
//       );

//       if (!response.ok) {
//         throw new Error("Transação não encontrada ou erro na API");
//       }

//       const data = await response.json();
//       setTransactionData(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="search">
//       <h3>Search Transaction by Hash</h3>
//       <input
//         type="text"
//         value={transactionHash}
//         onChange={(e) => setTransactionHash(e.target.value)}
//         placeholder="Enter Transaction Hash"
//       />
//       <button onClick={handleSearch}>Search</button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {transactionData && (
//         <div className="result">
//           <h4>Transaction Information</h4>
//           <p>
//             <strong>Transaction Hash:</strong> {transactionData.hash}
//           </p>
//           <p>
//             <strong>Ledger:</strong> {transactionData.ledger}
//           </p>
//           <p>
//             <strong>Successful:</strong> {transactionData.successful ? "Yes" : "No"}
//           </p>
//           <p>
//             <strong>Created At:</strong> {new Date(transactionData.created_at).toLocaleString()}
//           </p>
//           <p>
//             <strong>Operation Count:</strong> {transactionData.operation_count}
//           </p>
//           <p>
//             <strong>Source Account:</strong> {transactionData.source_account}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionSearch;

import React, { useState } from "react";

const TransactionSearch = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setTransactionData(null);

    try {
      const url = `https://1095-34-95-219-131.ngrok-free.app/transaction/hash_key/${transactionHash}`;
      console.log("Fetching:", url);

      const response = await fetch(url);

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const text = await response.text(); // Lê a resposta como texto primeiro
      console.log("Response body:", text);

      try {
        const data = JSON.parse(text);
        setTransactionData(data);
      } catch (jsonError) {
        throw new Error("A resposta não é um JSON válido.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="search">
      <h3>Search Transaction by Hash</h3>
      <input
        type="text"
        value={transactionHash}
        onChange={(e) => setTransactionHash(e.target.value)}
        placeholder="Enter Transaction Hash"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {transactionData && (
        <div className="result">
          <h4>Transaction Information</h4>
          <p>
            <strong>Transaction Hash:</strong> {transactionData.hash}
          </p>
          <p>
            <strong>Ledger:</strong> {transactionData.ledger}
          </p>
          <p>
            <strong>Successful:</strong> {transactionData.successful ? "Yes" : "No"}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(transactionData.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Operation Count:</strong> {transactionData.operation_count}
          </p>
          <p>
            <strong>Source Account:</strong> {transactionData.source_account}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionSearch;
