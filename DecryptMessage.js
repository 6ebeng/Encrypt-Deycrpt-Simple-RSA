var messageToDecrypt = [811, 1905, 1175, 1814, 1992, 41, 2369];
let privateKey = "(2075,2581)";


// This the dictionary of the characters and their corresponding numbers
const dictionary =  {
    " " : "00",
    "A" : "01",
    "B" : "02",
    "C" : "03",
    "D" : "04",
    "E" : "05",
    "F" : "06",
    "G" : "07",
    "H" : "08",
    "I" : "09",
    "J" : "10",
    "K" : "11",
    "L" : "12",
    "M" : "13",
    "N" : "14",
    "O" : "15",
    "P" : "16",
    "Q" : "17",
    "R" : "18",
    "S" : "19",
    "T" : "20",
    "U" : "21",
    "V" : "22",
    "W" : "23",
    "X" : "24",
    "Y" : "25",
    "Z" : "26"
  }

  function getMaxBlockSize(numbers) {
    let maxLength = 0;
  
    // Loop through the array of numbers
    for (let i = 0; i < numbers.length; i++) {
      // Convert the current number to a string
      let numString = numbers[i].toString();
  
      // Check the length of the string
      if (numString.length > maxLength) {
        // If the string is longer than the current maximum length, update the maximum length
        maxLength = numString.length;
      }
    }
  
    // Return the maximum length
    return maxLength;
  }

  function padWithZeros(num) {
    // Convert the number to a string
    let numString = num.toString();
    let blockSize = getMaxBlockSize(messageToDecrypt);
    // Check the length of the string
    if (numString.length < blockSize) {
      // If the string is less than blockSize characters long, pad it with zeros
      return "0".repeat(blockSize - numString.length) + numString;
    } else {
      // If the string is already blockSize characters long or longer, return it as is
      return numString;
    }
  }
  

  function decryptRSA(messageToDecrypt, privateKey, dictionary) {
    // Convert the message and private key to integers
    let message = messageToDecrypt.map(Number);
    //console.log(message)
    let key = privateKey.match(/[ 0-9,]+/g)[0].split(',').map(Number);
    console.log("d = " + key[0]);
    console.log("n = " + key[1]);
    // Decrypt the message using the private key and the dictionary
    var decryptedNumMessage = [];
    for (let i = 0; i < message.length; i++) {
      let num = message[i];
      let d = key[0];
      let n = key[1];
      let decryptedNum = (BigInt(num) ** BigInt(d)) % BigInt(n);
      //console.log(padWithZeros(decryptedNum))
      //console.log(getKeyByValue(dictionary,decryptedNum.toString()) || "Incorrect")
      decryptedNumMessage.push(padWithZeros(decryptedNum));
    }
  
    return decryptedNumMessage;
  }
function mapToKeysDictionary(decryptedNumMessage){
    const mappedKeys = [];
    // Iterate through the message
    decryptedNumMessage.forEach(element => {
        for (let i = 0; i < element.length; i = i + 2) {
            mappedKeys.push(Object.keys(dictionary).find(key => dictionary[key] === element[i]+element[i+1])|| "_");
        }
    });
    return mappedKeys;
}
  // Test the decryptRSA function
  let decryptedMessage = decryptRSA(messageToDecrypt, privateKey, dictionary);
  console.log("decryptedMessage in number = " + decryptedMessage) // should print the decrypted message in number
  console.log("decryptedMessage in alphabet = " + mapToKeysDictionary(decryptedMessage).join('')); // should print the decrypted message in alphabet