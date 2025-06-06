import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import TokenDashboard from "./components/TokenDashboard";
import "./styles/main.css";

function App() {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);

  return (
    <div className="app-container">
      <h1>XSpawn Web3 Dashboard</h1>
      {!wallet ? (
        <WalletConnect setWallet={setWallet} setProvider={setProvider} />
      ) : (
        <TokenDashboard wallet={wallet} provider={provider} />
      )}
    </div>
  );
}

export default App;