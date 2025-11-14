declare module 'lucide-react' {
  import * as React from 'react';

  export const Search: React.ComponentType<any>;
  export const ChevronLeft: React.ComponentType<any>;
  export const ChevronRight: React.ComponentType<any>;

  // Generic icon component fallback
  export const Icon: React.ComponentType<any>;

  const icons: { [key: string]: React.ComponentType<any> };
  export default icons;
}
