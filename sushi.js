const Web3 = require('web3');
const BigNumber = require('bignumber.js');

// TODO: create a free account with https://www.alchemy.com and paste your API key here
const web3 = new Web3(`https://eth-mainnet.alchemyapi.io/v2/FY6BwiO9_hzVN4N2Fx8Ti-XXXXXXXXXX`);

// TODO: change the Ethereum block number here if you want to check historic balances in a different date (see https://etherscan.io/blocks)
const BlockNumber = 13916165; // this is the last block of 2021-12-31, mined on Dec-31-2021 11:59:49 PM +UTC
const BalanceSnapshotTime = 'Dec-31-2021 11:59:49 PM +UTC';

// abi
const Erc20Abi = [{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const SushiLPAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

// TODO: verify all the LP tokens you want to check appear below
// Looking in Etherscan is a good source for addresses for missing LP tokens
const LPTokens = {
  ANGLE_ETH:  '0xfb55af0ef0dcdec92bd3752e7a9237dfefb8acc0',
  DATA2_ETH:  '0x208226200b45b82212b814f49efa643980a7bdd1',
  DOUGH_ETH:  '0x97f34c8e5992eb985c5f740e7ee8c7e48a1de76a',
  DYDX_ETH: '0xe4ebd836832f1a8a81641111a5b081a2f90b9430',
  GODS_ETH: '0x295685c8fe08d8192981d21ea1fe856a07443920',
  MARS4_ETH:  '0xb50580b0d81d9fe860746387cef9a8fc36d48d49',
  OT_aUSDC_29DEC2022_USDC:	'0x0d8a21f2ea15269b7470c347083ee1f85e6a723b',
  OT_aUSDC_30DEC2021_USDC:  '0x8b758d7fd0fc58fca8caa5e53af2c7da5f5f8de1',
  USDC_QUARTZ:  '0x1e888882d0f291dd88c5605108c72d414f29d460',
  renFIL_ETH: '0x9cee2ad771b57555c93f55d8babc3c8a221e3b74',
}

async function main() {
  const address = process.argv[2];
  if (!address) {
    console.log('Usage: script <wallet-address>');
    console.log('Example: script 0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2');
    process.exit(1);
  }
  // print csv header
  console.log('Wallet,Block,Balance Snapshot Time,LP Token Address,LP Balance,LP Supply,Token0,Token0 Balance,Token1,Token1 Balance');
  // go over all known pairs
  for (const lptoken in LPTokens) {
    const lptokenAddress = LPTokens[lptoken];
    const lptokenContract = new web3.eth.Contract(SushiLPAbi, lptokenAddress);
    await sleep(400); // avoid Alchemy api throttling
    const [lpbalance, lptotal, token0, token0Balance, token1, token1Balance] = await getLPData(lptokenContract, address, BlockNumber);
    // print token balance if non-zero
    if (lpbalance > 0) {
      console.log(`${address},${BlockNumber},${BalanceSnapshotTime},${lptokenAddress},${lpbalance},${lptotal},${token0},${token0Balance},${token1},${token1Balance}`);
    }
  }
}

async function getLPData(contract, address, block) {
  const decimals = await contract.methods.decimals().call();
  const decimalsNum = new BigNumber(`1e${decimals}`);
  const lpbalance = await contract.methods.balanceOf(address).call({}, block);
  const lpbalanceNum = new BigNumber(lpbalance).dividedBy(decimalsNum);
  const lptotal = await contract.methods.totalSupply().call({}, block);
  const lptotalNum = new BigNumber(lptotal).dividedBy(decimalsNum);
  const lpshareNum = new BigNumber(lpbalance).dividedBy(lptotal);
  const reserves = await contract.methods.getReserves().call({}, block);
  const token0Address = await contract.methods.token0().call({}, block);
  const token1Address = await contract.methods.token1().call({}, block);
  const token0Contract = new web3.eth.Contract(Erc20Abi, token0Address);
  const token1Contract = new web3.eth.Contract(Erc20Abi, token1Address);
  const token0 = await token0Contract.methods.symbol().call({}, block);
  const token1 = await token1Contract.methods.symbol().call({}, block);
  const token0decimals = await token0Contract.methods.decimals().call();
  const token0decimalsNum = new BigNumber(`1e${token0decimals}`);
  const token1decimals = await token1Contract.methods.decimals().call();
  const token1decimalsNum = new BigNumber(`1e${token1decimals}`);
  const token0reserveNum = new BigNumber(reserves._reserve0).dividedBy(token0decimalsNum);
  const token1reserveNum = new BigNumber(reserves._reserve1).dividedBy(token1decimalsNum);
  const token0BalanceNum = token0reserveNum.multipliedBy(lpshareNum);
  const token1BalanceNum = token1reserveNum.multipliedBy(lpshareNum);
  return [
    lpbalanceNum.toFormat(12).replaceAll(',',''),
    lptotalNum.toFormat(12).replaceAll(',',''),
    token0,
    token0BalanceNum.toFormat(6).replaceAll(',',''),
    token1,
    token1BalanceNum.toFormat(6).replaceAll(',',''),
  ];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();