const VendorLogin = () => {
    return (
        <>
            <div className="w-4/5 my-10">
                <label className="block mb-2 text-lg">Vendor ID</label>
                <input className="w-full" type="text" placeholder="Enter vendor ID" required/>
            </div>
            <div className="w-4/5">
                <label className="block mb-2 text-lg">Password</label>
                <input className="w-full" type="password" placeholder="Enter password" required/>
            </div>
        </>
    );
}
 
export default VendorLogin;