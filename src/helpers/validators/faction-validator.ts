import { FactionNameEnum } from '../../types/faction-enum';

/**
 * Validate faction name. Will throw an error if the value is not a valid faction.
 * @param { string } value - The value to validate.
 * @throws { Error } - If the value is not a valid faction.
 * @returns { boolean } - True if valid.
 */
export function validateFaction(value: string): boolean {
  if (
    !Object.values(FactionNameEnum).includes(
      value.toUpperCase() as FactionNameEnum
    )
  ) {
    throw new Error('Invalid faction');
  }
  return true;
}
