import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectCurrencyModal from "~components/swap/SelectCurrencyModal";
import PlusSVG from "~assets/misc/plus.svg";
import SubmitButton from "~components/general/SubmitButton";
import { getPool } from "~utils";
import {
  addLiquidity,
  getPoolShares,
  removeLiquidity,
} from "~utils/ContractUtils";

interface LiquidityContainerProps {
  selectedCoin: CoinForSwap;
  setCoin: Dispatch<SetStateAction<CoinForSwap>>;
  value: number;
  setValue: (value: number) => void;
}

interface LiquidityCardProps {
  defaultToken: CoinForSwap;
}

function LiquidityContainer({
  selectedCoin,
  setCoin,
  value,
  setValue,
}: LiquidityContainerProps) {
  return (
    <div className="flex flex-col p-3 bg-backgroundGray space-y-2">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-sm font-light text-gray-400">Input</p>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0.0"
          className="text-2xl font-inter"
        />
        <div className="flex flex-row items-center space-x-2.5">
          <SelectCurrencyModal selectedCoin={selectedCoin} setCoin={setCoin} />
        </div>
      </div>
    </div>
  );
}

function useEnsureSelectedIsValid(
  defaultCoin: CoinForSwap,
  coinOne: CoinForSwap,
  coinTwo: CoinForSwap,
  [setOne, setTwo]: Dispatch<SetStateAction<CoinForSwap>>[]
) {
  useEffect(() => {
    if (coinTwo && coinOne.id === coinTwo.id) {
      setTwo(null);
    }
    if (coinOne && coinTwo) {
      if (coinOne.id !== defaultCoin.id && coinTwo.id !== defaultCoin.id) {
        setOne(defaultCoin);
        setTwo(null);
      }
    }
  }, [coinOne, coinTwo]);
}

function LiquidityCard({ defaultToken }: LiquidityCardProps) {
  const [selectedCoinOne, setCoinOne] = useState<CoinForSwap>(defaultToken);
  const [selectedCoinTwo, setCoinTwo] = useState<CoinForSwap>();
  const [isAddingLiquidity, setIsAddingLiquidity] = useState<boolean>(true);

  const [amountOne, setAmountOne] = useState<number>(0);
  const [amountTwo, setAmountTwo] = useState<number>(0);
  const [userShares, setUserShares] = useState<number>(0);

  useEnsureSelectedIsValid(defaultToken, selectedCoinOne, selectedCoinTwo, [
    setCoinOne,
    setCoinTwo,
  ]);

  const { pool, poolId } = getPool(selectedCoinOne?.id, selectedCoinTwo?.id);

  useEffect(() => {
    if (poolId > -1) {
      getPoolShares(poolId).then((shares) => setUserShares(shares));
    } else {
      setUserShares(0);
    }
  }, [poolId]);
  return (
    <div className="flex flex-col  items-center lg:w-1/3 lg:min-w-25 mt-4 px-3 lg:px-6 rounded-lg border-2 border-black shadow-xl">
      <div className="flex flex-row align-center w-full space-x-2  ">
        <button
          type="button"
          onClick={() => setIsAddingLiquidity(true)}
          className={`text-left w-full py-6 ${
            isAddingLiquidity ? "text-black" : "text-gray-400"
          }`}
        >
          + Liquidity
        </button>
        {!!userShares && (
          <button
            type="button"
            onClick={() => setIsAddingLiquidity(false)}
            className={`text-left w-full py-6 ${
              !isAddingLiquidity ? "text-black" : "text-gray-400"
            }`}
          >
            - Liquidity
          </button>
        )}
      </div>
      <LiquidityContainer
        selectedCoin={selectedCoinOne}
        setCoin={setCoinOne}
        value={amountOne}
        setValue={(value) => setAmountOne(value)}
      />
      <div className="my-6">
        <PlusSVG />
      </div>
      <LiquidityContainer
        selectedCoin={selectedCoinTwo}
        setCoin={setCoinTwo}
        value={amountTwo}
        setValue={(value) => setAmountTwo(value)}
      />
      <div className="w-full">
        <SubmitButton
          text={!pool ? "No Pool Available" : "Provide Liquidity"}
          disabled={
            amountOne <= 0 ||
            amountTwo <= 0 ||
            !selectedCoinOne ||
            !selectedCoinTwo ||
            !pool
          }
          // todo: wire removeLiquidity
          onClick={
            isAddingLiquidity
              ? () => addLiquidity(poolId, [amountOne, amountTwo])
              : () => {}
          }
        />
      </div>
      <div className="w-full justify-center items-center pb-12">
        <h2 className="text-center text-lg ">
          Your shares in pool: {userShares}
        </h2>
      </div>
    </div>
  );
}

export default LiquidityCard;
