import { PublicKey } from '@solana/web3.js';
import * as Seeds from './seeds';

/**
 * Returns the public key and bump seed for the market variables account
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export async function getMarketVarsAccount(
    programId: PublicKey
): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
        [
           Seeds.MARKET_VARS_SEED
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for an order escrow account.
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export async function getOrderVault(
    orderInitializer: PublicKey,
    tokenMint: PublicKey,
    programId: PublicKey
): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
        [
            Seeds.ORDER_VAULT_SEED,
            orderInitializer.toBuffer(),
            tokenMint.toBuffer(),
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for an order escrow authority.
 *
 * @param playerPubkey - Pubkey of order initializer
 * @param programId - Deployed program ID for Galactic Marketplace
 */
export async function getOrderVaultAuth(
    playerPubkey: PublicKey,
    programId: PublicKey
): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
        [
            Seeds.ORDER_VAULT_AUTH_SEED,
            playerPubkey.toBuffer()
        ],
        programId,
    );
}

/**
 * Returns the public key and bump seed for a registered currency account
 *
 * @param programId - Deployed program ID for Galactic Marketplace
 * @param currencyMint - Mint address for registered currency
 */
export async function getRegisteredCurrencyAccount(
    programId: PublicKey,
    currencyMint: PublicKey,
): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
        [
            Seeds.REGISTERED_CURRENCY_SEED,
            currencyMint.toBuffer()
        ],
        programId,
    )
}
