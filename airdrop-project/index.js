const  {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require('@solana/web3.js')

const wallet = new Keypair;

const publickey = new PublicKey(wallet._keypair.publicKey)
const secretkey = wallet._keypair.secretKey

const getWalletBalance = async () => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publickey)
        console.log(`Wallet balance is ${walletBalance}`)
    } catch(err){
        console.error(err);
    }
}

const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSol = await connection.requestAirdrop(publickey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSol)
    } catch(err){
        console.log(err)
    }
}
const main = async () => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main();