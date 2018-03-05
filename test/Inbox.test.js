const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile')
 
 let accounts;
 let inbox;
beforeEach(async () => {
//get a list of accounts

accounts = await web3.eth.getAccounts()

inbox = await new web3.eth.Contract(JSON.parse(interface))
.deploy({ data: bytecode, arguments: ['hey there']})
.send ({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () =>{
it('deploys a contract', () => {
console.log (inbox);
});
});

 /*class Car{

 	park(){

 		return 'Stopped';
 	}
 	drive(){

 		return 'vrooooom';
 	}
 }
let car;
beforeEach(() => {
car = new Car();
});

 describe ('Car', () => {
 	it('it can park',() => {
 		assert.equal(car.park(), 'Stopped');
 	});
 	it('it can drive',() => {
 		assert.equal(car.drive(), 'vrooooom');
 	});
 });*/
