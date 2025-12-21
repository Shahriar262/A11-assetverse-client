import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imgUpload } from "../../utils";

const AddAssetForm = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const productName = form.name.value;
    const productType = form.type.value; 
    const productQuantity = Number(form.quantity.value);
    const imageFile = form.image.files[0];

    try {
      let productImage = "";

      if (imageFile) {
        productImage = await imgUpload(imageFile);
      }

      const assetData = {
        productName,
        productType,
        productQuantity,
        productImage,
      };

      await axiosSecure.post("/assets", assetData);

      toast.success("Asset added successfully");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-gray-50 rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Product Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter asset name"
                className="w-full px-4 py-3 border rounded-md focus:outline-indigo-500"
              />
            </div>

            {/* Product Type */}
            <div className="space-y-1 text-sm">
              <label htmlFor="type" className="block text-gray-600">
                Product Type
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-4 py-3 border rounded-md focus:outline-indigo-500"
              >
                <option value="">Select type</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Quantity */}
            <div className="space-y-1 text-sm">
              <label htmlFor="quantity" className="block text-gray-600">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                required
                placeholder="Available quantity"
                className="w-full px-4 py-3 border rounded-md focus:outline-indigo-500"
              />
            </div>

            {/* Image Upload */}
            <div className="p-4 border-2 border-dashed rounded-lg">
              <label className="block text-sm text-gray-600 mb-2">
                Product Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="block w-full text-sm text-gray-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
            >
              {loading ? "Saving..." : "Add Asset"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAssetForm;
