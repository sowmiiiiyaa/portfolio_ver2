import { useEffect, useState } from 'react';

export function useAssetAvailability(assetPath: string | undefined) {
  const [available, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (!assetPath) {
      setAvailable(false);
      return;
    }

    let isActive = true;

    const probe = async () => {
      try {
        const response = await fetch(assetPath, { method: 'HEAD', cache: 'no-store' });
        if (isActive) {
          const contentType = response.headers.get('content-type') ?? '';
          setAvailable(response.ok && !contentType.includes('text/html'));
        }
      } catch {
        if (isActive) {
          setAvailable(false);
        }
      }
    };

    probe();

    return () => {
      isActive = false;
    };
  }, [assetPath]);

  return available;
}