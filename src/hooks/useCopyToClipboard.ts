import { useState } from 'react';
import toast from 'react-hot-toast';

function useCopyToClipboard() {
  const [result, setResult] = useState<null | { state: 'success' } | { state: 'error'; message: string }>(null);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setResult({ state: 'success' });
      toast.success('Copied to clipboard');
    } catch (e) {
      const error = e as Error;
      setResult({ state: 'error', message: error.message });
      throw e;
    } finally {
      setTimeout(() => {
        setResult(null);
      }, 2000);
    }
  };
  return [copy, result] as const;
}

export default useCopyToClipboard;
