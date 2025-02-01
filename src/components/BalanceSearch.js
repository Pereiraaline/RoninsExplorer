import React, { useState } from 'react';

const BalanceSearch = () => {
  const [address, setAddress] = useState('');
  const [balanceData, setBalanceData] = useState(null);
  const [error, setError] = useState(null);

const handleSearch = async () => {
  setError(null);
  setBalanceData(null);

  try {
    const response = await fetch(
      `https://api.stellar.org/v1/accounts/${address}`
    );

    if (!response.ok) {
      throw new Error("Endereço não encontrado ou erro na API");
    }

    const data = await response.json();
    setBalanceData(data);
  } catch (err) {
    setError(err.message);
  }
};

return (
  <div className="search">
    <h3>Search Balance by Address</h3>
    <input
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Enter Address"
    />
    <button onClick={handleSearch}>Search</button>

    {error && <p style={{ color: "red" }}>{error}</p>}

    {balanceData && (
      <div className="result">
        <h4>Account Information</h4>
        <p>
          <strong>Address:</strong> {balanceData.id}
        </p>
        <h4>Balances</h4>
        <ul>
          {balanceData.balances.map((bal, index) => (
            <li key={index}>
              <strong>Asset:</strong> {bal.asset_type === "native" ? "XLM" : bal.asset_code} <br />
              <strong>Balance:</strong> {bal.balance}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
};

export default BalanceSearch;
