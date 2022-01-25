import {
    Idl,
    Program,
    Provider,
    web3
} from "@project-serum/anchor";
import { SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { getGmIDL } from "..";

/**
 * Creates an instruction to initialize an offer account which can be passed into an initialize offer instruction.
 *
 * Must add to an existing web3.Transaction. Transaction recentBlockhash and feePayer must be defined.
 * Must call ".partialsign(offerAccount)" before sending transaction containing this instruction or you will receive signature verification errors.
 *
 * @param connection
 * @param payer - PublicKey of offer initializer
 * @param offerAccount - Keypair for offer account, can be obtained with "anchor.web3.Keypair.generate()"
 * @param programId - Deployed program ID for GM program
 */
export async function createAccountInstruction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    offerAccount: web3.Keypair,
    programId: web3.PublicKey,
): Promise<TransactionInstruction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    return SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: offerAccount.publicKey,
        space: program.account.offerAccount.size,
        lamports: await connection.getMinimumBalanceForRentExemption(
            program.account.offerAccount.size
        ),
        programId
    });
}

/**
 * Creates a transaction to initialize an offer account which can be passed into an initialize offer instruction.
 *
 * Can ".add()" additional instructions to this transaction.
 *
 * Must call ".partialsign(offerAccount)" before sending this transaction or you will receive signature verification errors.
 *
 * @param connection
 * @param payer - PublicKey of offer initializer
 * @param offerAccount - Keypair for offer account, can be obtained with "anchor.web3.Keypair.generate()"
 * @param programId - Deployed program ID for GM program
 */
export async function createAccountTransaction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    offerAccount: web3.Keypair,
    programId: web3.PublicKey,
): Promise<Transaction> {
    const idl = getGmIDL(programId);
    const provider = new Provider(connection, null, null);
    const program = new Program(idl as Idl, programId, provider);

    const tx = new Transaction(
        {
            recentBlockhash: (await connection.getRecentBlockhash()).blockhash,
            feePayer: payer
        }
    );
    tx.add(SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: offerAccount.publicKey,
        space: program.account.offerAccount.size,
        lamports: await connection.getMinimumBalanceForRentExemption(
            program.account.offerAccount.size
        ),
        programId
    }))

    return tx;
}