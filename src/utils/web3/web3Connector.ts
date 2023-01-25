import { InjectedConnector } from '@web3-react/injected-connector';

const chainId = 56;
const injected = new InjectedConnector({ supportedChainIds: [chainId] });

export const connectors = {
  injected: injected, // metamask용 connector
};
