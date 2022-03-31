# Historic Value of LP Pairs in Various Liquidity/Staking Protocols

A set of simple scripts to extract historic value of LP pairs on Ethereum from UniswapV2, Sushi, Kyber, Bancor and PancakeSwap protocols. The scripts rely on on-chain data only and use an archive node to run state queries on a specific historic date. The scripts attempt to convert the LP token at the previous date back into the original token pairs and outputs the amount of each token that would have been received then.

## Instructions

1. Make sure you have Node.js installed and run in terminal:
    ```
    npm install
    ```

2. Go over the code (sushi.js, uniswap.js, kyber.js, bancor.js, pancake.js) and review all the TODOs

3. Run in terminal (replacing 0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2 with your wallet address):
    ```
    node sushi 0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2 > output-sushi.csv
    node uniswap 0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2 > output-uniswap.csv
    node kyber 0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2 > output-kyber.csv
    node bancor 0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2 > output-bancor.csv
    node pancake 0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2 > output-pancake.csv
    ```

4. Open `output-sushi.csv`, `output-uniswap.csv`, `output-kyber.csv`, `output-bancor.csv`, `output-pancake.csv` in Excel