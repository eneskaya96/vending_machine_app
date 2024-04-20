import { ReactNode, useEffect, useState } from 'react';
interface Props {
  children?: ReactNode;
}
export default function ClientOnly({ children }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div>{children}</div>;
}
