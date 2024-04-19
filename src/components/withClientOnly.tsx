import { FC, ReactNode, useEffect, useState } from "react";

const withClientOnly = <P extends object>(WrappedComponent: FC<P>) => {
  const ClientOnly: FC<P> = (props) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ClientOnly;
};

export default withClientOnly;
