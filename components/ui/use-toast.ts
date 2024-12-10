import {
  useCallback,
  useState,
} from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((options) => {
    setToast(options);
  }, []);

  return { toast, showToast };
};

// You would also need to provide this context in your app
