/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import ProyectoDocumentosAbi from '../../abi/ProyectoDocumentos.json';

dotenv.config();

@Injectable()
export class BlockchainService implements OnModuleInit {
  private contract: ethers.Contract;

  async onModuleInit() {
    const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);
    const signer = await provider.getSigner(0);

    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      ProyectoDocumentosAbi,
      signer,
    );
  }

  async guardarDocumento(hashIpfs: string) {
    const tx = await this.contract.guardarDocumento(hashIpfs);
    return await tx.wait();
  }

  async obtenerMisDocumentos() {
    return await this.contract.obtenerMisDocumentos();
  }
}
