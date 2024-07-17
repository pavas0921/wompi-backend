import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class TokenizationCard {
  private readonly baseURL = 'https://api-sandbox.co.uat.wompi.dev/v1';
  private readonly publicKey = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';

  async tonkenizateCard(
    number: string,
    exp_month: string, // Mes de expiración (como string de 2 dígitos)
    exp_year: string, // Año de expiración (como string de 2 dígitos)
    cvc: string, // Código de seguridad (como string de 3 o 4 dígitos)
    card_holder: string,
  ) {
    const url = `${this.baseURL}/tokens/cards`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.publicKey}`,
    };

    const body = {
      number,
      exp_month,
      exp_year,
      cvc,
      card_holder,
    };

    try {
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }
}
