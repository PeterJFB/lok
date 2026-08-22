export type Result<T, Err = null> = ResultOk<T> | ResultErr<Err>;
export type ResultOk<T> = { isOk: true; obj: T };
export type ResultErr<Err> = { isOk: false; err: Err };

export const ok = <T>(obj: T): ResultOk<T> => ({
  isOk: true,
  obj
});

export const err = <Err = null>(err: Err): ResultErr<Err> => ({
  isOk: false,
  err
});
