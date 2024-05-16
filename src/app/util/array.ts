import * as _ from 'lodash';

/**
 * to flat array
 * @param array target array
 * @param all flat all
 * @returns flat array
 */
export function flat(array: any[], all?: boolean) {
  return all ? _.flattenDeep(array) : array.flat();
}
