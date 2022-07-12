import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import { BaseParams } from '../../util/BaseParams';
import { getPointsProgram } from '../utils';

/** Params for Create User Point Account instruction */
export interface CreateUserPointAccountParams extends BaseParams {
  user: PublicKey /** the user public key */;
  pointCategoryAccount: PublicKey /** the Point Category Account PublicKey */;
}

/**
 * Creates a user Point Account
 * @param user - the user public key
 * @param pointCategoryAccount - the Point Category Account PublicKey
 * @param connection - the Solana connection objec
 * @param programId - Deployed program ID for the Points program
 */
export const createUserPointAccountIx = async ({
  user,
  pointCategoryAccount,
  connection,
  programId,
}: CreateUserPointAccountParams): Promise<{
  signers: web3.PublicKey[];
  instructions: web3.TransactionInstruction[];
}> => {
  const program = getPointsProgram(connection, programId);

  const instructions = [
    await program.methods
      .createUserPointAccount()
      .accounts({
        user,
        pointCategoryAccount,
      })
      .instruction(),
  ];

  return {
    signers: [],
    instructions,
  };
};