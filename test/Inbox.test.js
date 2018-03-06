const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile')
 
 let accounts;
 let inbox;
beforeEach(async () => {
//get a list of accounts

accounts = await web3.eth.getAccounts()

inbox = await new web3.eth.Contract(JSON.parse(interface))
.deploy({ data: bytecode, arguments: ['hey there']})
.send ({ from: accounts[0], gas: '1000000'});

 inbox.setProvider(provider);
});

describe('Inbox', () =>{
it('deploys a contract', () => {
assert.ok(inbox.options.address);
});

it('has a default message', async () =>{
const message = await inbox.methods.message().call();
assert.equal(message, 'hey there');
});
it('can change the message', async () => {
await inbox.methods.setMessage('bye bye').send({ from: accounts[0] });
const message = await inbox.methods.message().call();
assert.equal(message, 'bye bye');
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
