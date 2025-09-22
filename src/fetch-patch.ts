/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/fetch-patch.ts
import { fetch as undiciFetch } from 'undici';

export function fetchWithDuplex(input: any, init?: any) {
  if (init && init.body && !init.duplex) {
    return undiciFetch(input, { ...init, duplex: 'half' });
  }
  return undiciFetch(input, init);
}

// 👇 remplazamos el fetch global de Node.js
(global as any).fetch = fetchWithDuplex;
