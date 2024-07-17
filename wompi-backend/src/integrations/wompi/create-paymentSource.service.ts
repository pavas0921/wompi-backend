import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PaymentSource {
  private readonly baseURL = 'https://api-sandbox.co.uat.wompi.dev/v1';
  private readonly privateKey = 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg';

  async createPaymentSource(
    customer_email: string,
    type: string,
    token: string,
    acceptance_token: string,
  ) {
    const url = `${this.baseURL}/payment_sources`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.privateKey}`,
    };

    const body = {
      customer_email,
      type,
      token,
      acceptance_token,
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
