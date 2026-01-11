'use client';
import {useEffect, useRef} from 'react';
import JsBarcode from 'jsbarcode';
import Image from 'next/image';
type Props = {
  name: string;
  code: string;
  lot: string;
  qty: number;
  nsx: string;
  donggoi: string;
  hsd: string;
  barcodeProduct: string;
  note: string;
};
export default function BoxLabel({
  name,
  code,
  lot,
  qty,
  nsx,
  donggoi,
  hsd,
  barcodeProduct,
  note,
}: Props) {
  const productBarcodeRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (productBarcodeRef.current && barcodeProduct) {
      try {
        productBarcodeRef.current.innerHTML = '';
        JsBarcode(productBarcodeRef.current, barcodeProduct, {
          format: 'CODE128',
          width: 2,
          height: 45,
          displayValue: false,
          margin: 0,
        });
      } catch (error) {
        console.error('Error generating product barcode:', error);
      }
    }
  }, [barcodeProduct]);

  return (
    <div
      className='print-area-box w-[100mm] h-[80mm] border-2 border-gray-800 bg-white text-gray-900 flex flex-col'
      style={{boxSizing: 'border-box'}}
    >
      {/* HEADER - Logo và thông tin công ty */}
      <div className='px-2.5 py-1.5 border-b border-gray-800 bg-white'>
        <div className='flex items-start justify-between'>
          <div className='shrink-0'>
            <Image
              src='/nutty.png'
              alt='Logo'
              width={65}
              height={23}
              className='object-contain'
            />
          </div>
          <div className='text-right flex-1'>
            <div className='font-bold text-sm text-gray-900 mb-0.5'>
              KCN OSIFF
            </div>
            <div className='text-gray-700 text-[10px] leading-tight'>
              Huyện Cần Giuộc, Tỉnh Tây Ninh
            </div>
          </div>
        </div>
      </div>
      {/* TÊN SẢN PHẨM */}
      <div className='px-2.5 py-1.5 border-b border-gray-800 bg-white'>
        <div className='font-bold uppercase text-base leading-tight text-gray-900 text-center tracking-wide'>
          {name}
        </div>
      </div>
      {/* THÔNG TIN SẢN PHẨM */}
      <div className='px-2.5 py-1.5 border-b border-gray-800 bg-white'>
        <div className='flex justify-between items-start'>
          <div className='space-y-1'>
            <div className='flex items-center'>
              <span className='text-gray-900 font-medium text-[10px]'>
                Mã SP:
              </span>
              <span className='font-bold text-gray-900 text-xs ml-1'>
                {code}
              </span>
            </div>
            <div className='flex items-center'>
              <span className='text-gray-900 font-medium text-[10px]'>
                Số lô/series:
              </span>
              <span className='font-bold text-gray-900 text-xs ml-1'>
                {lot}
              </span>
            </div>
          </div>
          <div className='text-right'>
            <span className='text-gray-900 font-medium text-[10px]'>
              Số lượng:
            </span>
            <span className='font-bold text-gray-900 text-sm ml-1'>{qty}</span>
          </div>
        </div>
      </div>

      {/* DATES - 3 cột hoặc 2 cột nếu không có ngày đóng gói */}
      <div className='px-2.5 py-1.5 border-b border-gray-800 bg-white'>
        {donggoi ? (
          <div className='grid grid-cols-3 divide-x divide-gray-800'>
            <div className='text-center'>
              <div className='text-gray-900 font-bold text-[10px] uppercase mb-0.5'>
                NSX
              </div>
              <div className='font-bold text-gray-900 text-xs'>{nsx}</div>
            </div>
            <div className='text-center'>
              <div className='text-gray-900 font-bold text-[10px] uppercase mb-0.5'>
                NDG
              </div>
              <div className='font-bold text-gray-900 text-xs'>{donggoi}</div>
            </div>
            <div className='text-center'>
              <div className='text-gray-900 font-bold text-[10px] uppercase mb-0.5'>
                HSD
              </div>
              <div className='font-bold text-gray-900 text-xs'>{hsd}</div>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-2 divide-x divide-gray-800'>
            <div className='text-center'>
              <div className='text-gray-900 font-bold text-[10px] uppercase mb-0.5'>
                NSX
              </div>
              <div className='font-bold text-gray-900 text-xs'>{nsx}</div>
            </div>
            <div className='text-center'>
              <div className='text-gray-900 font-bold text-[10px] uppercase mb-0.5'>
                HSD
              </div>
              <div className='font-bold text-gray-900 text-xs'>{hsd}</div>
            </div>
          </div>
        )}
      </div>

      {/* BARCODE - Bottom section */}
      {barcodeProduct ? (
        <div className='px-2.5 py-1.5 bg-white flex-1 flex flex-col justify-center'>
          <div className='flex justify-center items-center'>
            <svg
              ref={productBarcodeRef}
              width='75mm'
              height='18mm'
              className='max-w-full h-auto block'
            />
          </div>
          <div className='text-center mb-1'>
            <span className='text-gray-900 font-bold text-[10px] uppercase'></span>
            <span className='text-gray-900 font-bold text-xs'>
              {barcodeProduct}
            </span>
          </div>
        </div>
      ) : null}

      <div className='flex gap-1'>
        <div className='font-bold'>Ghi chú:</div>
        <span>{note}</span>
      </div>
    </div>
  );
}
