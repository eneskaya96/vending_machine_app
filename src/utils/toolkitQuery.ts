import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { QueryStatus } from '@reduxjs/toolkit/query/react';

export const matchQuery = <E, D, RL, RE, RS, RT>(
  queryResult: TypedUseQueryHookResult<RT, D, any>,
  matches: {
    idle: () => RL;
    loading: () => RL;
    error: (error: E) => RE;
    success: (data: RT) => RS;
  },
): RL | RE | RS => {
  switch (queryResult.status) {
    case QueryStatus.uninitialized:
      return matches.idle();
    case QueryStatus.fulfilled:
      return queryResult.data ? matches.success(queryResult.data) : matches.loading();
    case QueryStatus.pending:
      return matches.loading();
    case QueryStatus.rejected:
      return matches.error(queryResult.error);
  }
};
