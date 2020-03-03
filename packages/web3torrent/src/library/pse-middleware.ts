import {ExtensionConstructor, Wire} from 'bittorrent-protocol';
import {PaidStreamingExtension} from './paid-streaming-extension';
import {Wireish} from './types';
import {Web3TorrentChannelClientInterface} from '../clients/web3t-channel-client';

/**
 * Returns a bittorrent extension
 * @param {Object} opts
 * @param {String} [opts.pseAccount] Random ID number
 * @return {typeof PaidStreamingExtension}
 */
export default function usePaidStreamingExtension(
  options: PaidStreamingExtensionOptions
): ExtensionConstructor {
  return class PSE extends PaidStreamingExtension {
    constructor(wireToUse: Wire) {
      super(wireToUse as Wireish);
      this.pseAccount = options.pseAccount;
      this.pseAddress = options.outcomeAddress;
    }
  };
}

export type PaidStreamingExtensionOptions = {
  pseAccount: string;
  channelClient?: Web3TorrentChannelClientInterface;
  outcomeAddress: string;
};
