import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import InputAmount from '~components/forms/InputAmount';
import { Radio } from '~components/icon';
import { TokenMetadata } from '~services/ft-contract';
import { TokenBalancesView } from '~services/token';
import {
  percentLess,
  subtraction,
  toPrecision,
  toReadableNumber,
} from '~utils/numbers';
import { toRealSymbol } from '~utils/token';
import Alert from '~components/alert/Alert';
import BigNumber from 'bignumber.js';

export function Icon(props: {
  icon?: string;
  className?: string;
  style?: any;
}) {
  const { icon, className, style } = props;
  return icon ? (
    <img
      className={`block ${className} rounded-full border border-gradientFromHover border-solid`}
      src={icon}
      style={style}
    />
  ) : (
    <div
      className={`rounded-full ${className} border border-gradientFromHover  border-solid`}
      style={style}
    />
  );
}

export function FlexibleStableToken({
  token,
  amountsFlexible,
  setAmountFlexible,
  index,
}: {
  token: TokenMetadata;
  amountsFlexible: string[];
  setAmountFlexible: (e: string) => void;
  index: number;
}) {
  return (
    <div className="flex flex-col">
      <div className="w-full flex items-start mb-8">
        <div className="flex items-center mr-4 mt-1 w-1/4">
          <Icon icon={token.icon} className="h-9 w-9 mr-2" />
          <div className="text-white text-sm" title={token.id}>
            {toRealSymbol(token.symbol)}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <InputAmount
            className="w-full border border-transparent rounded"
            onChangeAmount={setAmountFlexible}
            value={amountsFlexible[index]}
          />
        </div>
      </div>
    </div>
  );
}

export default function StableTokenList(props: {
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
  firstTokenAmount: string;
  secondTokenAmount: string;
  thirdTokenAmount: string;
  changeFirstTokenAmount?: (e: string) => void;
  changeSecondTokenAmount?: (e: string) => void;
  changeThirdTokenAmount?: (e: string) => void;
}) {
  const {
    tokens,
    balances,
    firstTokenAmount,
    secondTokenAmount,
    thirdTokenAmount,
    changeFirstTokenAmount,
    changeSecondTokenAmount,
    changeThirdTokenAmount,
  } = props;
  if (tokens.length < 1) return null;

  return (
    <div className="mt-4 px-8">
      <div className="text-xs text-right mb-1 text-gray-400">
        <FormattedMessage id="balance" defaultMessage="Balance" />
        :&nbsp;
        <span
          title={toReadableNumber(tokens[0].decimals, balances[tokens[0].id])}
        >
          {toPrecision(
            toReadableNumber(tokens[0].decimals, balances[tokens[0].id]),
            2,
            true
          )}
        </span>
      </div>
      <div className="flex items-center ">
        <div className="flex items-center w-28 xs:w-24 md:w-24">
          <Icon
            icon={tokens[0].icon}
            className="h-9 w-9 xs:h-7 md:h-7 xs:w-7 md:w-7 mr-2"
          />
          <div className="text-white text-base" title={tokens[0].id}>
            {toRealSymbol(tokens[0].symbol)}
          </div>
        </div>
        <InputAmount
          className="flex-grow border border-transparent rounded"
          max={toReadableNumber(tokens[0].decimals, balances[tokens[0].id])}
          onChangeAmount={(e) => {
            changeFirstTokenAmount(e);
          }}
          value={firstTokenAmount}
        />
      </div>
      <div className=" my-4">
        <div className="text-xs text-right mb-1 text-gray-400">
          <FormattedMessage id="balance" defaultMessage="Balance" />
          :&nbsp;
          <span
            title={toReadableNumber(tokens[1].decimals, balances[tokens[1].id])}
          >
            {toPrecision(
              toReadableNumber(tokens[1].decimals, balances[tokens[1].id]),
              2,
              true
            )}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center w-28 xs:w-24 md:w-24">
            <Icon
              icon={tokens[1].icon}
              className="h-9 w-9 xs:h-7 md:h-7 xs:w-7 md:w-7 mr-2"
            />
            <div className="text-white text-base" title={tokens[1].id}>
              {toRealSymbol(tokens[1].symbol)}
            </div>
          </div>
          <InputAmount
            className="flex-grow border border-transparent rounded"
            max={toReadableNumber(tokens[1].decimals, balances[tokens[1].id])}
            onChangeAmount={changeSecondTokenAmount}
            value={secondTokenAmount}
          />
        </div>
      </div>
      <div className="my-4">
        <div className="text-xs text-right mb-1 text-gray-400">
          <FormattedMessage id="balance" defaultMessage="Balance" />
          :&nbsp;
          <span
            title={toReadableNumber(tokens[2].decimals, balances[tokens[2].id])}
          >
            {toPrecision(
              toReadableNumber(tokens[2].decimals, balances[tokens[2].id]),
              2,
              true
            )}{' '}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center w-28 xs:w-24 md:w-24">
            <Icon
              icon={tokens[2].icon}
              className="h-9 w-9 xs:h-7 md:h-7 xs:w-7 md:w-7 mr-2"
            />
            <div className="text-white text-base" title={tokens[2].id}>
              {toRealSymbol(tokens[2].symbol)}
            </div>
          </div>
          <InputAmount
            className="flex-grow border border-transparent rounded"
            max={toReadableNumber(tokens[2].decimals, balances[tokens[2].id])}
            onChangeAmount={changeThirdTokenAmount}
            value={thirdTokenAmount}
          />
        </div>
      </div>
    </div>
  );
}

export function FlexibleStableTokenList(props: {
  tokens: TokenMetadata[];
  amountsFlexible: string[];
  setAmountsFlexible: ((e: string) => void)[];
}) {
  const { tokens, amountsFlexible, setAmountsFlexible } = props;
  if (tokens.length < 1) return null;
  return (
    <div>
      {tokens.map((token, i) => {
        return (
          <FlexibleStableToken
            token={token}
            index={i}
            key={i}
            amountsFlexible={amountsFlexible}
            setAmountFlexible={setAmountsFlexible[i]}
          />
        );
      })}
    </div>
  );
}

export function StableTokensSymbol(props: {
  tokens: TokenMetadata[];
  receiveAmounts: string[];
  slippageTolerance: number;
}) {
  const { tokens, receiveAmounts, slippageTolerance } = props;

  const calcTokenReceived = (receiveAmount: string, token: TokenMetadata) => {
    const nonPrecisionAmount = percentLess(
      slippageTolerance,
      toReadableNumber(token.decimals, receiveAmount)
    );

    return Number(nonPrecisionAmount) < 0.001 && Number(nonPrecisionAmount) > 0
      ? '< 0.001'
      : toPrecision(nonPrecisionAmount, 3);
  };

  return (
    <div className="flex mb-6 items-center justify-between">
      <div className="flex">
        <Icon icon={tokens[0].icon} className="inline-block h-9 w-9 mr-2" />
        <div className="ml-2 inline-block">
          <p className="text-sm">{toRealSymbol(tokens[0].symbol)}</p>
          <div className="text-xs">
            {calcTokenReceived(receiveAmounts[0], tokens[0])}
          </div>
        </div>
      </div>
      <div> + </div>
      <div className="flex">
        <Icon icon={tokens[1].icon} className="inline-block h-9 w-9 mr-2" />
        <div className="ml-2 inline-block">
          <p className="text-sm">{toRealSymbol(tokens[1].symbol)}</p>
          <div className="text-xs">
            {calcTokenReceived(receiveAmounts[1], tokens[1])}
          </div>
        </div>
      </div>
      <div> + </div>
      <div className="flex">
        <Icon icon={tokens[2].icon} className="inline-block h-9 w-9 mr-2" />
        <div className="ml-2 inline-block">
          <p className="text-sm">{toRealSymbol(tokens[2].symbol)}</p>
          <div className="text-xs">
            {calcTokenReceived(receiveAmounts[2], tokens[2])}
          </div>
        </div>
      </div>
    </div>
  );
}
