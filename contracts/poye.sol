pragma solidity ^0.4.23;

contract poye {
  struct Message {
    address sender;
    string text;
    uint created_at;
  }

  event MessageSent ( uint indexed id, address indexed sender, string text, uint created_at);

  Message[] public messages;
  mapping(address => uint[]) userToMessages;

  constructor() public
  {
    // To avoid id=0
    messages.push(Message(0, "", now));
  }

  function getMessage(uint _id) external view returns(uint, address,string, uint)
  {
    uint id = userToMessages[msg.sender][_id];
    require(id < messages.length);
	Message memory message = messages[id];
    return (id, message.sender, message.text, message.created_at);
  }

  // returns latest 20 messages between msg.sender and theother.
  function getMessages() external view returns (uint[20])
  {
    uint[20] memory results;
	uint counter = 0;
    for (uint i=0; i < userToMessages[msg.sender].length && counter < 20; i++)
	{
	  uint mId = userToMessages[msg.sender][userToMessages[msg.sender].length - 1 - i];
	  Message memory m = messages[mId];
	  if (m.sender == msg.sender)
	  {
	    results[counter] = mId;
	    counter++;
	  }
	}
	return results;
  }

  // Send a message from msg.sender to recipient
  function sendMessage(string _text) external returns(uint)
  {
    require(bytes(_text).length > 0);
    uint timestamp = now;
    uint id = messages.push(Message(msg.sender,_text, timestamp)) - 1;
	userToMessages[msg.sender].push(id);
	emit MessageSent(id, msg.sender,_text, timestamp);
	return id;
  }
}
