import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class Transactions {
  private readonly baseURL = 'https://api-sandbox.co.uat.wompi.dev/v1';
  private readonly privateKey = 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg';

  async createTransaction(
    amount_in_cents: number,
    currency: string,
    signature: string,
    customer_email: string,
    payment_method: { installments: number },
    reference: string,
    payment_source_id: number,
  ) {
    const url = `${this.baseURL}/transactions`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.privateKey}`,
    };

    const body = {
      amount_in_cents,
      currency,
      signature,
      customer_email,
      payment_method,
      reference,
      payment_source_id,
    };

    try {
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating payment source: ${error.message}`);
    }
  }
}
