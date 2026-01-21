'use client';
import {useEffect, useRef} from 'react';
import JsBarcode from 'jsbarcode';
type Props = {
  name: string;
  code: string;
  lot: string;
  qty: number;
  nsx: string;
  donggoi: string;
  hsd: string;
  barcodeProduct: string;
  netWeight: number;
  packType: string;
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
  netWeight,
  packType,
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
      className='print-area-box w-[100mm] h-[80mm] border-2 border-[#1f2937] bg-[#ffffff] text-[#111827] flex flex-col'
      style={{boxSizing: 'border-box'}}
    >
      {/* HEADER - Logo và thông tin công ty */}
      <div className='px-2.5 py-1.5 border-b border-[#1f2937] bg-[#ffffff]'>
        <div className='flex items-start justify-between'>
          <div className='shrink-0'>
            <img
              src='/Nutty Factory logo_01.png'
              alt='Logo'
              width={90}
              height={40}
              style={{
                width: '90px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
          <div className='text-right flex-1'>
            <div className='font-bold text-sm text-[#111827] mb-0.5'>
              CÔNG TY TNHH KASH FINE FOOD
            </div>
            <div className='text-[#374151] text-[10px] leading-tight'>
              C3, Khu xưởng OSSIF <br /> KCN Tân Kim, Xã Cần Giuộc, Tỉnh Tây
              Ninh, Việt Nam
            </div>
          </div>
        </div>
      </div>
      {/* TÊN SẢN PHẨM */}
      <div className='px-2.5 py-1.5 border-b border-[#1f2937] bg-[#ffffff]'>
        <div className='font-bold uppercase text-base leading-tight text-[#111827] text-center tracking-wide'>
          {name}
        </div>
      </div>
      {/* THÔNG TIN SẢN PHẨM */}
      <div className='px-2.5 py-1.5 border-b border-[#1f2937] bg-[#ffffff]'>
        <div className='flex justify-between items-start'>
          <div className='space-y-1'>
            <div className='flex items-center'>
              <span className='text-[#111827] font-medium text-[10px]'>
                Mã SP:
              </span>
              <span className='font-bold text-[#111827] text-xs ml-1'>
                {code}
              </span>
            </div>
            <div className='flex items-center'>
              <span className='text-[#111827] font-medium text-[10px]'>
                Số lô/series:
              </span>
              <span className='font-bold text-[#111827] text-xl ml-1'>
                {lot}
              </span>
            </div>
          </div>
          <div className='space-y-1'>
            <div className='flex items-center'>
              <span className='text-[#111827] font-medium text-[10px]'>
                KLT:
              </span>
              <span className='font-bold text-[#111827] text-sm ml-1'>
                {netWeight}g/{packType}
              </span>
            </div>
            <div className='text-right'>
              <span className='text-[#111827] font-medium text-[10px]'>
                Số lượng:
              </span>
              <span className='font-bold text-[#111827] text-sm ml-1'>
                {qty} {packType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DATES - 3 cột hoặc 2 cột nếu không có ngày đóng gói */}
      <div className='border-b border-[#1f2937] bg-[#ffffff]'>
        <div className='flex justify-between justify-between items-center'>
          {nsx && (
            <div className='text-center flex-1 border-r'>
              <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
                NSX
              </div>
              <div className='font-bold text-[#111827] text-xs'>{nsx}</div>
            </div>
          )}
          {donggoi && (
            <div className='text-center flex-1 border-r'>
              <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
                NDG
              </div>
              <div className='font-bold text-[#111827] text-xs'>{donggoi}</div>
            </div>
          )}

          <div className='text-center flex-1 border- '>
            <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
              HSD
            </div>
            <div className='font-bold text-[#111827] text-xs'>{hsd}</div>
          </div>
        </div>
        {/* {donggoi ? (
          <div className='grid grid-cols-3 divide-x divide-[#1f2937]'>
            <div className='text-center'>
              <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
                NSX
              </div>
              <div className='font-bold text-[#111827] text-xs'>{nsx}</div>
            </div>
            <div className='text-center'>
              <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
                NDG
              </div>
              <div className='font-bold text-[#111827] text-xs'>{donggoi}</div>
            </div>
            <div className='text-center'>
              <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
                HSD
              </div>
              <div className='font-bold text-[#111827] text-xs'>{hsd}</div>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-2 divide-x divide-[#1f2937]'>
            <div className='text-center'>
              <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
                NSX
              </div>
              <div className='font-bold text-[#111827] text-xs'>{nsx}</div>
            </div>
            <div className='text-center'>
              <div className='text-[#111827] font-bold text-[10px] uppercase mb-0.5'>
                HSD
              </div>
              <div className='font-bold text-[#111827] text-xs'>{hsd}</div>
            </div>
          </div>
        )} */}
      </div>

      {/* BARCODE - Bottom section */}

      {barcodeProduct ? (
        <div className='px-2.5 py-1.5 bg-[#ffffff] flex-1 flex flex-col justify-center'>
          <div className='flex justify-center items-center'>
            <svg
              ref={productBarcodeRef}
              width='75mm'
              height='17mm'
              className='max-w-full h-auto block'
            />
          </div>
          <div className='text-center mb-1'>
            <span className='text-[#111827] font-bold text-[10px] uppercase'></span>
            <span className='text-[#111827] font-bold text-xs'>
              {barcodeProduct}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
