export type DbGetError =
  | {
      type: 'not-found';
    }
  | {
      type: 'database-error';
    };

export type DbDeleteError =
  | {
      type: 'not-found';
    }
  | {
      type: 'database-error';
    };
