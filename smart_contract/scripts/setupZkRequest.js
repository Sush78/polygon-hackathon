const main = async () => {

    const circuitId = "credentialAtomicQuerySig";
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

    // Grab the schema hash from Polygon ID Platform
    const schemaHash =  "86d3ebcfc97d6f7c844bafa262d4d970" // 6815b2cd6f253cbad68e56eaa9fb4964

    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))

    const ageQuery = {
        schema: ethers.BigNumber.from(schemaEnd),
        slotIndex: 2,
        operator: 1,
        value: [1, ...new Array(63).fill(0).map(i => 0)],
        circuitId,
    };

    // add the address of the contract just deployed
    ERC20VerifierAddress = "0x9b93536577666b1a31fef8EaBdF6Ac5DfbAf5e56"

    let erc20Verifier = await hre.ethers.getContractAt("ERC20Verifier", ERC20VerifierAddress)

    const requestId = await erc20Verifier.TRANSFER_REQUEST_ID();

    try {
        await erc20Verifier.setZKPRequest(
        requestId,
        validatorAddress,
        ageQuery
        );
        console.log("Request set");
    } catch (e) {
        console.log("error: ", e);
    }
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function fromLittleEndian(bytes) {
    const n256 = BigInt(256);
    let result = BigInt(0);
    let base = BigInt(1);
    bytes.forEach((byte) => {
      result += base * BigInt(byte);
      base = base * n256;
    });
    return result;
}

const runMain = async () => {
    try{
      await main() 
      process.exit(0)
    }catch(error){
      console.log(error)
      process.exit(1)
    }
}
  
runMain()