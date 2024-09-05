import { useState, useEffect, useCallback } from 'react';
import CustomDialog from './CustomDialog'; 

const SearchWithDropdown = ({ setProducts }) => {
  const [productName, setProductName] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');
  const [dialogMessage, setDialogMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const [debouncedProductName, setDebouncedProductName] = useState(productName);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedProductName(productName);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [productName]); 

  const fetchProducts = useCallback(async () => {
    let url = `https://gebeyaye-backend.vercel.app/api/product/search?category=${encodeURIComponent(selectedOption)}`;

    if (debouncedProductName) {
      url += `&productName=${encodeURIComponent(debouncedProductName)}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setDialogMessage('No products found');
          setShowDialog(true);
        } else {
          setProducts(data);
        }
      } else {
        setDialogMessage('Server returned an error while fetching products');
        setShowDialog(true);
      }
    } catch (error) {
      setDialogMessage(`Error: ${error.message}`);
      setShowDialog(true);
    }
  }, [debouncedProductName, selectedOption, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedProductName, selectedOption, fetchProducts]);

  return (
    <>
      <form className="flex w-4/5 mx-auto">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="all">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationary">Stationary</option>
          <option value="Clothes">Clothes</option>
          <option value="Furniture">Furniture</option>
        </select>

        <div className="relative w-full">
          <input
            className="rounded-e-lg w-full"
            type="search"
            placeholder="Search..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)} 
          />
        </div>
      </form>

      {showDialog && (
        <CustomDialog
          message={dialogMessage}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default SearchWithDropdown;
