/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client';

@Injectable()
export class IpfsService {
  private readonly ipfs;

  constructor() {
    // Conecta al nodo IPFS local
    this.ipfs = create({ url: 'http://127.0.0.1:5001' });
  }

  async addFile(content: Buffer | string): Promise<string> {
    const result = await this.ipfs.add(content);
    return result.cid.toString();
  }

  async getFile(cid: string): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of this.ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
}
