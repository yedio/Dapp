import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const getNetworkId = async () => {
  const currentChainId = await web3.eth.net.getId();
  return currentChainId;
};

export const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = 56;

    const currentChainId = await getNetworkId();

    if (currentChainId !== chainId) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
        return true;
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log('switchError', switchError);
        if (switchError.code === 4902 || switchError.code === -32603) {
          // add Network: BSC Mainnet
          if (chainId === 56) {
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x38',
                    chainName: 'BSC Mainnet',
                    nativeCurrency: {
                      name: 'Binance Coin',
                      symbol: 'BNB',
                      decimals: 18,
                    },
                    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com'],
                  },
                ],
              });
              return true;
            } catch (addError) {
              console.log('addError', addError);
            }
          } else {
            alert(`add this chain id: ${chainId}`);
          }
        }
      }
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};
