const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token Smart Contract', function () {

  let token;
  let owner_account;
  let account_1;
  let account_2;

  this.beforeEach(async function(){

    //create and deploy token contract to blockchain
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy(1000000);
    await token.deployed();

    //Get accounts already created on the blockchain
    [owner_account, account_1, account_2] = await ethers.getSigners();
  });


  it('deploys successfully with correct initial supply', async function () {

    //get the balance of owner account where token was deployed to
    const ownerBalance = await token.balanceOf(owner_account.address);
    //convert owner balance to readable string
    const ownerBalanceString = ethers.utils.formatEther(ownerBalance);
    //check the owner balance string is equal to the amount minted when contract was deployed
    expect(ownerBalanceString).to.equal('1000000.0');
  });

  it('allows sending to another account', async function(){

    //transfer 100 tokens from owner account to account 1
    await token.transfer(account_1.address, ethers.utils.parseEther('100'));
    //expect balance of account 1 to be 100
    expect(await token.balanceOf(account_1.address)).to.equal(ethers.utils.parseEther('100'));

  });

  it('allows an account to send on behalf of another account', async function(){

    //connect to account 1 and allow owner account to send 1000 tokens on behalf of account 1
    await token.connect(account_1).approve(owner_account.address, ethers.utils.parseEther('1000'));
    //transfer 1000 tokens from owner account to address 1
    await token.transfer(account_1.address, ethers.utils.parseEther('1000'));
    //transfer 1000 tokens from account 1 to account 2
    await token.transferFrom(account_1.address, account_2.address, ethers.utils.parseEther('1000'));
    //expect balance of address 2 to be 1000
    expect(await token.balanceOf(account_2.address)).to.equal(ethers.utils.parseEther('1000'));
  });



});
