import { useState } from 'react';

const SearchWithDropdown = ({setProducts}) => {
  const [productName, setProductName] = useState('');
  const [selectedOption, setSelectedOption] = useState('all'); // Default dropdown option

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Searching for '${productName}' in '${selectedOption}'`);

    try{
      const response= await fetch(`/api/product/search?category=${encodeURIComponent(selectedOption)}&productName=${encodeURIComponent(productName)}`, {
        method: 'GET',
        headers:{
          "Content-Type":"application/json"
        },
      })

      if (response.ok){
        const data= await response.json();
        setProducts(data)

      } else{
        console.log('Server returned and error')
      }

    }catch(error){
      console.log("Error", error)
    }
    

  };

  return (
    <form onSubmit={handleSubmit} className="flex w-4/5 mx-auto">
      <select value={selectedOption} onChange={handleSelectChange} className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100  rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'>
        <option value="all">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="stationary">Stationary</option>
        <option value="Clothes">Clothes</option>
        <option value="Furniture">Furniture</option>        
      </select>
      
      <div class="relative w-full">
        <input className='rounded-e-lg w-full'
          type="search"
          placeholder="Search..."
          value={productName}
          onChange={handleInputChange}
          required
        />
          <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
          </button>
      </div>
    </form>
  );
};

export default SearchWithDropdown;
