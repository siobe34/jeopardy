export const groupArrayOfObjsBy = <TArrayElement>({
  array,
  groupByKeys,
}: {
  array: TArrayElement[];
  groupByKeys: (keyof TArrayElement)[];
}): Record<string, TArrayElement[]> => {
  return array.reduce(
    (initialValue, currentValue) => {
      const key = groupByKeys
        .map((groupByKey) => currentValue[groupByKey])
        .join("&");

      // * If the initialValue (originally empty object = {}) does not contain a key of 'group', then initialize an empty array with that key
      if (!Object.keys(initialValue).includes(key)) initialValue[key] = [];
      if (initialValue[key] === undefined) initialValue[key] = [];

      // HACK: had to tell TS initialValue[key] is always defined, see guard clause above
      initialValue[key]!.push(currentValue);

      return initialValue;
    },
    {} as Record<string, TArrayElement[]>,
  );
};
