import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0xABC123456789abcdefABC123456789abcdefABCD";
const contractABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function claimTokens() public"
];

export default function TokenDashboard({ wallet, provider }) {
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!provider || !wallet) return;
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
    (async () => {
      const bal = await contract.balanceOf(wallet);
      setBalance(ethers.utils.formatUnits(bal, 18));
    })();
  }, [wallet, provider]);

  const claim = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
    try {
      setStatus("Claiming...");
      const tx = await contract.claimTokens();
      await tx.wait();
      setStatus("✅ Claimed!");
      const bal = await contract.balanceOf(wallet);
      setBalance(ethers.utils.formatUnits(bal, 18));
    } catch (e) {
      console.error(e);
      setStatus("❌ Failed to claim");
    }
  };

  return (
    <div>
      <p><strong>Wallet:</strong> {wallet}</p>
      <p><strong>XPS Balance:</strong> {balance ?? "..."}</p>
      <button onClick={claim}>Claim XPS Tokens</button>
      <p>{status}</p>
    </div>
  );
}