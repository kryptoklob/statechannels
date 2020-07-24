import {calculateChannelId, StateVariables} from '@statechannels/wallet-core';
import _ from 'lodash';

import {Channel, RequiredColumns} from '../../../models/channel';
import {Fixture, fixture, DeepPartial} from '../../../wallet/__test__/fixtures/utils';
import {addHash} from '../../../state-utils';
import {alice, bob} from '../../../wallet/__test__/fixtures/signingWallets';
import {createState, stateSignedBy} from '../../../wallet/__test__/fixtures/states';

export const channel: Fixture<Channel> = (props?: DeepPartial<RequiredColumns>) => {
  const {appDefinition, chainId, challengeDuration, channelNonce, participants} = createState();

  const defaults: RequiredColumns = {
    appDefinition,
    channelNonce,
    chainId,
    challengeDuration,
    participants,
    signingAddress: alice().address,
    vars: [],
  };

  const columns: RequiredColumns = _.merge(defaults, props);

  const channelId = calculateChannelId(columns);
  return Channel.fromJson(_.merge({channelId}, columns));
};

export const channelWithVars: Fixture<Channel> = fixture<Channel>(
  channel({vars: [addHash(stateSignedBy()())]})
);

export const withSupportedState = (stateVars: Partial<StateVariables>): Fixture<Channel> =>
  fixture(channel({vars: [addHash(stateSignedBy(alice(), bob())({...stateVars}))]}));
