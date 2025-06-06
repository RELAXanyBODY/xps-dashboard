import { useState } from "react";
import { CHAINS } from "../utils/chains";
import { ethers } from "ethers";

export default function WalletConnect({ setWallet, setProvider }) {
  const [networkName, setNetworkName] = useState("ethereum");

  const connect = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      setWallet(accounts[0]);

      const chain = CHAINS[networkName];
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chain.chainId }],
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    } catch (err) {
      if (err.code === 4902 && CHAINS[networkName].rpcUrls) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [CHAINS[networkName]],
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <select onChange={(e) => setNetworkName(e.target.value)}>
        {Object.entries(CHAINS).map(([key, val]) => (
          <option key={key} value={key}>{val.name}</option>
        ))}
      </select>
      <button onClick={connect}>Connect Wallet</button>
    </div>
  );
}