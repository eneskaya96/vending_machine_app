import { useErrorBoundary } from 'react-error-boundary';

interface Props {
  error?: any;
  message?: string;
}

export function DefaultErrorState({ error, message = 'Something went wrong.' }: Props) {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div role="alert">
      <p>{message}</p>
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}
