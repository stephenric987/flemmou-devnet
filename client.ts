// Flemmou — Solana Playground client. Devnet only; no private key in this file.
import * as spl from "@solana/spl-token";
import * as metadata from "@solana/spl-token-metadata";

const NAME = "Flemmou";
const SYMBOL = "FLMO";
const DECIMALS = 6;
const RAW_SUPPLY = BigInt("1000000000000000");
const SEED = "flemmou-devnet-v1";

async function main() {
  const connection = pg.connection;
  if (connection.rpcEndpoint !== "https://api.devnet.solana.com") {
    throw new Error("Ce projet fonctionne uniquement sur Solana Devnet.");
  }
  const payer = pg.wallet.keypair;
  if (!payer || !payer.publicKey.equals(pg.wallet.publicKey)) {
    throw new Error("Connecter le portefeuille de test Playground.");
  }
  const program = spl.TOKEN_2022_PROGRAM_ID;
  const mint = await web3.PublicKey.createWithSeed(payer.publicKey, SEED, program);
  const ownerAccount = spl.getAssociatedTokenAddressSync(
    mint, payer.publicKey, false, program
  );
  const explorer = `https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet`;
  console.log(`${NAME} / ${SYMBOL} — DEVNET uniquement`);
  console.log("Portefeuille de test :", payer.publicKey.toBase58());
  console.log("Adresse du token prevue :", mint.toBase58());

  async function verify() {
    const token = await spl.getMint(connection, mint, "confirmed", program);
    const details = await spl.getTokenMetadata(connection, mint, "confirmed", program);
    const account = await spl.getAccount(connection, ownerAccount, "confirmed", program);
    if (token.supply !== RAW_SUPPLY || token.decimals !== DECIMALS ||
        token.mintAuthority !== null || token.freezeAuthority !== null ||
        details?.name !== NAME || details?.symbol !== SYMBOL) {
      throw new Error("Le token existe mais sa configuration doit etre inspectee.");
    }
    console.log("VERIFIE : Flemmou (FLMO), 1 000 000 000 jetons, 6 decimales.");
    console.log("Emission supplementaire : desactivee. Gel : desactive.");
    console.log("Solde du compte createur (unites de base) :", account.amount.toString());
    console.log("Explorateur :", explorer);
  }

  // A fixed derived address makes a second Run verify the same token.
  if (await connection.getAccountInfo(mint, "confirmed")) {
    console.log("Le token existe deja ; verification sans nouvelle emission.");
    await verify();
    return;
  }

  const meta = {
    updateAuthority: payer.publicKey,
    mint,
    name: NAME,
    symbol: SYMBOL,
    uri: "", // On-chain name and symbol; no hosted logo/JSON yet.
    additionalMetadata: [],
  };
  const mintSpace = spl.getMintLen([spl.ExtensionType.MetadataPointer]);
  const totalSpace = mintSpace + spl.TYPE_SIZE + spl.LENGTH_SIZE + metadata.pack(meta).length;
  const rent = await connection.getMinimumBalanceForRentExemption(totalSpace);
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.createAccountWithSeed({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint,
      basePubkey: payer.publicKey,
      seed: SEED,
      space: mintSpace,
      lamports: rent,
      programId: program,
    }),
    spl.createInitializeMetadataPointerInstruction(mint, payer.publicKey, mint, program),
    spl.createInitializeMintInstruction(mint, DECIMALS, payer.publicKey, null, program),
    metadata.createInitializeInstruction({
      programId: program,
      metadata: mint,
      updateAuthority: payer.publicKey,
      mint,
      mintAuthority: payer.publicKey,
      name: NAME,
      symbol: SYMBOL,
      uri: "",
    }),
    spl.createAssociatedTokenAccountIdempotentInstruction(
      payer.publicKey, ownerAccount, payer.publicKey, mint, program
    ),
    spl.createMintToInstruction(mint, ownerAccount, payer.publicKey, RAW_SUPPLY, [], program),
    spl.createSetAuthorityInstruction(
      mint, payer.publicKey, spl.AuthorityType.MintTokens, null, [], program
    )
  );
  transaction.feePayer = payer.publicKey;
  const latest = await connection.getLatestBlockhash("confirmed");
  transaction.recentBlockhash = latest.blockhash;
  transaction.lastValidBlockHeight = latest.lastValidBlockHeight;
  const size = transaction.serialize({requireAllSignatures: false, verifySignatures: false}).length;
  if (size > 1232) throw new Error("Transaction trop volumineuse.");
  console.log("Transaction preparee :", size, "octets.");

  const balance = await connection.getBalance(payer.publicKey, "confirmed");
  console.log("SOL de test disponibles :", balance / web3.LAMPORTS_PER_SOL);
  if (balance < 10_000_000) {
    console.log("EN ATTENTE : demander au moins 0.01 SOL de test pour ce portefeuille.");
    console.log("https://faucet.solana.com/");
    console.log("Aucun token cree, aucune transaction envoyee.");
    return;
  }

  // All setup, metadata, issuance and authority removal succeed or fail together.
  const signature = await web3.sendAndConfirmTransaction(
    connection, transaction, [payer], {commitment: "confirmed", preflightCommitment: "confirmed"}
  );
  console.log("Transaction confirmee :", signature);
  await verify();
}

await main();
