import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TransactionCurrentStatus {
  private readonly baseURL = 'https://api-sandbox.co.uat.wompi.dev/v1';
  private readonly publicKey = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';

  async getPaymentStatus(transactionId: string) {
    const url = `${this.baseURL}/transactions/${transactionId}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }
}
