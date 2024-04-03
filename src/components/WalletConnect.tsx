// components/WalletConnect.tsx
import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnect = () => {
  const { connect, connected, publicKey } = useWallet();

  return (
    <div>
      {!connected ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <div>
          <p>Wallet Connected: {publicKey?.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
