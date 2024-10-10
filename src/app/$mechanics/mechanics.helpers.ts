export const checkAP = (current: number, cost: number) => {
  if (cost > current) {
    throw new Error(`Not enough AP, ${cost}[${current}]`,);
  }

  return true;
}

export const getConfigsDict = <C, T extends { id: string, config: C } = { id: string, config: C }>(entities: T[]) => {
  return entities.reduce(
    (rec, { id, config }) => ({
      [id]: config,
      ...rec
    }),
    {} as Record<string, C>
  );
}
