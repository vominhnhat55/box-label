'use client';
import {useState} from 'react';
import BoxLabel from './BoxLabel';
import {products} from '@/data/products';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export default function PrintForm() {
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [data, setData] = useState({
    name: '',
    code: '',
    barcodeProduct: '',
    lot: '',
    qty: 0,
    nsx: '',
    donggoi: '',
    hsd: '',
    note: '',
  });
  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcodeProduct?.includes(searchQuery)
  );
  const handleProductSelect = (product: (typeof products)[0]) => {
    setSelectedProductId(product.id);
    setSearchQuery(`${product.name} (${product.code})`);
    setShowSuggestions(false);
    setData({
      ...data,
      name: product.name,
      code: product.code,
      barcodeProduct: product.barcodeProduct || '',
      qty: product.defaultQty,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(true);
    if (!value) {
      setSelectedProductId('');
      setData({
        ...data,
        name: '',
        code: '',
        barcodeProduct: '',
        qty: 0,
      });
    }
  };

  // Validate số lô: 6 ký tự, gồm 5 số và 1 chữ
  const validateLot = (lot: string): boolean => {
    if (!lot || lot.length !== 6) return false;
    const numbers = lot.match(/\d/g) || [];
    const letters = lot.match(/[A-Za-z]/g) || [];
    return numbers.length === 5 && letters.length === 1;
  };

  const handleLotChange = (value: string) => {
    // Chỉ cho phép số và chữ, tự động chuyển chữ thành chữ hoa
    const cleaned = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6); // Giới hạn 6 ký tự
    setData({...data, lot: cleaned});
  };

  const handleNoteChange = (value: string) => {
    // Chỉ cho phép số và chữ, tự động chuyển
    setData({...data, note: value});
  };
  const isLotValid = !data.lot || validateLot(data.lot);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (
    field: 'nsx' | 'donggoi' | 'hsd',
    value: string
  ) => {
    setData({...data, [field]: formatDate(value)});
  };

  const isValid =
    data.name &&
    data.code &&
    data.lot &&
    validateLot(data.lot) &&
    data.qty > 0 &&
    data.nsx &&
    data.hsd;

  const handleDownloadPdf = async () => {
    const element = document.querySelector('.print-area-box') as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [100, 80],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 100, 80);
      pdf.save(`${data.name || 'label'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Có lỗi xảy ra khi tạo PDF');
    }
  };
  return (
    <>
      {/* FORM – không in */}
      <div className='print:hidden flex flex-col gap-3 border p-4 rounded-lg bg-white shadow-sm max-w-md'>
        <h2 className='text-xl font-bold text-gray-900 mb-2'>In Tem Thùng</h2>

        {/* Tìm kiếm sản phẩm */}
        <div className='relative'>
          <label className='text-black font-medium mb-1 block'>
            Tìm kiếm sản phẩm <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <input
              type='text'
              className='w-full text-black border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white pr-10'
              placeholder='Nhập tên, mã SP hoặc barcode...'
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay để cho phép click vào suggestion
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />
            {searchQuery && (
              <button
                type='button'
                onClick={() => {
                  setSearchQuery('');
                  setSelectedProductId('');
                  setShowSuggestions(false);
                  setData({
                    ...data,
                    name: '',
                    code: '',
                    barcodeProduct: '',
                    qty: 0,
                  });
                }}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold leading-none'
              >
                ×
              </button>
            )}
          </div>
          {/* Suggestions dropdown */}
          {showSuggestions && searchQuery && filteredProducts.length > 0 && (
            <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-auto'>
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type='button'
                  className='w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0'
                  onClick={() => handleProductSelect(product)}
                >
                  <div className='font-semibold text-gray-900'>
                    {product.name}
                  </div>
                  <div className='text-sm text-gray-600'>
                    Mã: {product.code} | Barcode: {product.barcodeProduct}
                  </div>
                </button>
              ))}
            </div>
          )}
          {showSuggestions && searchQuery && filteredProducts.length === 0 && (
            <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg p-3 text-gray-500 text-sm'>
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm (read-only) */}
        {selectedProductId && (
          <div className='bg-gray-50 p-3 rounded border border-gray-300 space-y-2'>
            <div>
              <span className='text-gray-600 text-sm font-medium'>Tên SP:</span>
              <div className='text-gray-900 font-semibold'>{data.name}</div>
            </div>
            <div>
              <span className='text-gray-600 text-sm font-medium'>Mã SP:</span>
              <div className='text-gray-900 font-semibold'>{data.code}</div>
            </div>
            <div>
              <span className='text-gray-600 text-sm font-medium'>
                Barcode:
              </span>
              <div className='text-gray-900 font-semibold'>
                {data.barcodeProduct}
              </div>
            </div>
          </div>
        )}

        {/* Số lượng (có thể chỉnh sửa) */}
        <div>
          <label className='text-black font-medium mb-1 block'>
            SL/Thùng <span className='text-red-500'>*</span>
          </label>
          <input
            className='w-full text-black border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
            type='number'
            placeholder='Số lượng'
            value={data.qty || ''}
            onChange={(e) => setData({...data, qty: +e.target.value})}
            min='1'
          />
        </div>

        {/* Số lô */}
        <div>
          <label className='text-black font-medium mb-1 block'>
            Số lô (LOT) <span className='text-red-500'>*</span>
          </label>
          <input
            className={`w-full text-black border p-2 rounded-sm focus:outline-none focus:ring-2 ${
              data.lot && !isLotValid
                ? 'border-red-500 focus:ring-red-400'
                : 'focus:ring-gray-400'
            }`}
            placeholder='601A03 (6 ký tự: 5 số + 1 chữ)'
            value={data.lot}
            onChange={(e) => handleLotChange(e.target.value)}
            maxLength={6}
          />
          {data.lot && !isLotValid && (
            <p className='text-red-500 text-xs mt-1'>
              Số lô phải có 6 ký tự: 5 số và 1 chữ (VD: 601A03)
            </p>
          )}
          {data.lot && isLotValid && (
            <p className='text-green-600 text-xs mt-1'>✓ Định dạng hợp lệ</p>
          )}
        </div>
        {/* Ngày sản xuất */}
        <div>
          <label className='text-black font-medium mb-1 block'>
            Ngày sản xuất <span className='text-red-500'>*</span>
          </label>
          <input
            className='w-full text-black border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
            type='date'
            onChange={(e) => handleDateChange('nsx', e.target.value)}
          />
        </div>

        {/* Ngày đóng gói - Tùy chọn */}
        <div>
          <label className='text-black font-medium mb-1 block'>
            Ngày đóng gói{' '}
            <span className='text-gray-500 text-xs'>(Tùy chọn)</span>
          </label>
          <input
            className='w-full text-black border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
            type='date'
            onChange={(e) => handleDateChange('donggoi', e.target.value)}
          />
        </div>

        {/* Ngày hết hạn */}
        <div>
          <label className='text-black font-medium mb-1 block'>
            Ngày hết hạn <span className='text-red-500'>*</span>
          </label>
          <input
            className='w-full text-black border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
            type='date'
            onChange={(e) => handleDateChange('hsd', e.target.value)}
          />
        </div>
        <label className='text-black font-medium mb-1 block'>
          Ghi chú<span className='text-gray-500 text-xs'>(Tùy chọn)</span>
        </label>
        <input
          className='w-full text-black border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
          placeholder='Ghi chú...'
          value={data.note}
          onChange={(e) => handleNoteChange(e.target.value)}
        />
        <div className='flex gap-2 flex-wrap'>
          <button
            disabled={!isValid}
            onClick={() => setShowPreview(true)}
            className='flex-1 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
          >
            Xem trước
          </button>
          <button
            disabled={!isValid}
            onClick={handleDownloadPdf}
            className='flex-1 bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
          >
            Tải PDF
          </button>
          <button
            disabled={!isValid}
            onClick={() => {
              document.body.classList.add('box-label-print');
              const style = document.createElement('style');
              style.id = 'print-page-size';
              style.textContent = '@page { size: 100mm 80mm; margin: 0; }';
              document.head.appendChild(style);
              window.print();
              setTimeout(() => {
                document.body.classList.remove('box-label-print');
                const style = document.getElementById('print-page-size');
                if (style) style.remove();
              }, 100);
            }}
            className='flex-1 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
          >
            In tem
          </button>
        </div>
      </div>

      {/* LABEL – chỉ in */}
      {isValid && <BoxLabel {...data} />}

      {/* PREVIEW MODAL */}
      {showPreview && isValid && (
        <div
          className='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4 print:hidden'
          onClick={() => setShowPreview(false)}
        >
          <div
            className='bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col print:hidden'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='sticky top-0 bg-gray-100 px-4 py-3 flex justify-between items-center border-b z-10'>
              <h3 className='font-bold text-base sm:text-lg text-gray-900'>
                Tem
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className='text-gray-600 hover:text-gray-900 text-2xl font-bold leading-none w-8 h-8 flex items-center justify-center'
              >
                ×
              </button>
            </div>
            <div className='flex-1 overflow-auto p-2 sm:p-4 bg-gray-100'>
              <div className='flex justify-center items-center min-h-full'>
                <div className='scale-[0.8] sm:scale-[1.2] md:scale-[1.5] origin-center transition-transform'>
                  <BoxLabel {...data} />
                </div>
              </div>
            </div>
            <div className='bg-gray-100 px-4 py-2 text-center text-xs sm:text-sm text-gray-600 border-t'>
              <p>Kích thước 100mm × 80mm</p>
              <p className='text-[10px] mt-1'>Pinch để zoom trên điện thoại</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
