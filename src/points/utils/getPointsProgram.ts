import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { Connection } from '@solana/web3.js';
import { IDL } from '../types/points_program';
import type { Points } from '../types/points_program';

/**
 * Returns the base IDL for the Points program following as generated by Anchor with provided program ID appended to metadata.
 *
 * @param programId - Deployed program ID for the Points program
 * @returns - The base IDL object
 */
function getPointsIDL(programId: web3.PublicKey): unknown {
  const _tmp = IDL;
  _tmp['metadata'] = { address: programId.toBase58() };
  return _tmp;
}

/**
 * Get the Points Anchor program
 * @param connection - the Solana connection object
 * @param programId - Deployed program ID for the Points program
 * @returns the Points anchor program
 */
export function getPointsProgram (
  connection: Connection,
  programId: web3.PublicKey
){
  const idl = getPointsIDL(programId);
  const provider = new AnchorProvider(connection, null, null);
  const program = new Program(<Points>idl, programId, provider);
  return program;
}