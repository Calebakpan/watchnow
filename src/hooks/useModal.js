import { useState } from 'react';

export function useModal() {
  const [selected, setSelected] = useState(null);
  return {
    selected,
    open: (item) => setSelected(item),
    close: () => setSelected(null),
  };
}
