export interface Product {
  id: string;
  name: string;
  code: string;
  barcodeProduct: string | null;
  defaultQty: number;
  netWeight: number;
  packType: string;
}

import rawProducts from './dmsp_with_code.json';
export const products: Product[] = rawProducts as Product[];
