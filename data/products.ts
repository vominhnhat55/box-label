export interface Product {
  id: string;
  name: string;
  code: string;
  barcodeProduct: string;
  defaultQty: number;
}
export const products: Product[] = [
  {
    id: '1',
    name: 'Bí xanh nướng gói 150g(X)',
    code: 'BXN250-ZN158-X',
    barcodeProduct: '123456790',
    defaultQty: 6,
  },
  {
    id: '2',
    name: 'Bí đỏ nướng gói 200g(X)',
    code: 'BDN200-ZN158-X',
    barcodeProduct: '123456790',
    defaultQty: 6,
  },
  {
    id: '3',
    name: 'Khoai tây nướng gói 150g(X)',
    code: 'KTN150-ZN158-X',
    barcodeProduct: '123456791',
    defaultQty: 8,
  },
  {
    id: '4',
    name: 'Cà rốt nướng gói 100g(X)',
    code: 'CRN100-ZN158-X',
    barcodeProduct: '123456792',
    defaultQty: 10,
  },
];
