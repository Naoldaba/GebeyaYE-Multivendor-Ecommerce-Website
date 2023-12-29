import React from 'react';

const VendorMain = ({ activeMenu, products }) => {
  let content = null;

  switch (activeMenu) {
    case 'products':
        content = (
        <div className="products flex flex-wrap justify-center items-center gap-3">
            <h2 className='w-full text-3xl text-center my-6'>Product List</h2>
            {products.map((product)=>(
                <div key={product.id} className="product bg-white justify-self-center rounded-lg p-6 w-64 shadow-2xl ">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4"/>
                    <div className="flex flex-wrap gap-3">
                        <h3 className="text-lg font-semibold mb-2">{product.name} </h3>
                        <p className="text-green-600 font-bold">Price: {product.price}Br.</p>
                        <p className="text-gray-600 mb-2 w-full">{product.description}</p>
                        <p className=''>{products.description}</p>  
                    </div> 
                </div>
            ))}
        </div>
    );
      break;
    case 'addProduct':
      content = (
        <div className='w-4/5 shadow-2xl pb-4'>
            <h2 className='text-3xl text-center mb-20'>Add Product Form</h2>
            <form className='w-2/3 mx-auto flex flex-col gap-4'>
              <p className='text-lg'>Uplaod Photo</p>
              <div class=" h-36 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center">
                  <label for="file-upload" class="cursor-pointer">
                    <input id="file-upload" type="file" class="hidden" />
                    <div class="text-center">
                      <svg
                        class="w-12 h-12 text-gray-400 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      <p class="text-gray-400">Click or drag and drop to upload</p>
                  </div>
                </label>
              </div>
              <label className='text-lg'>Write Description<textarea type="text" className='w-full resize-none'></textarea></label>
              <label className='text-lg'>Specify Price<input className='w-full' type="number"/></label>
              <button className='bg-blue-500 p-2 text-white mt-5 rounded' type="submit">Post</button>
            </form>
            
        </div>
        
      );
      break;
    case 'report':
      content = <div>Report Section</div>;
      break;
    default:
      content = <div>Select an option from the sidebar</div>;
  }

  return <div className="main-section col-span-7 flex justify-center items-center mb-4">{content}</div>;
};

export default VendorMain;
