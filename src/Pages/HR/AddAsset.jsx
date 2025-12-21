import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { TbFidgetSpinner } from "react-icons/tb";
import { imgUpload } from "../../utils";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productType: "Returnable",
    quantity: 1,
    productImage: null,
    companyName: "", // companyName added
  });

  // Fetch HR info to get companyName
  useEffect(() => {
    const fetchHR = async () => {
      try {
        const { data } = await axiosSecure.get("/hr/me"); // backend route returns HR info
        setFormData((prev) => ({
          ...prev,
          companyName: data.companyName || "N/A",
        }));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch HR info");
      }
    };
    fetchHR();
  }, [axiosSecure]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData((prev) => ({ ...prev, [name]: files[0] }));
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.productType || !formData.quantity)
      return toast.error("Please fill all fields");

    setLoading(true);
    try {
      let imageUrl = "";
      if (formData.productImage) {
        imageUrl = await imgUpload(formData.productImage);
      }

      await axiosSecure.post("/assets", {
        productName: formData.productName,
        productType: formData.productType,
        quantity: parseInt(formData.quantity, 10),
        availableQuantity: parseInt(formData.quantity, 10),
        productImage: imageUrl,
        companyName: formData.companyName || "N/A",
      });

      toast.success("Asset added successfully");
      setFormData({
        productName: "",
        productType: "Returnable",
        quantity: 1,
        productImage: null,
        companyName: formData.companyName,
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Asset</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Asset Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter asset name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Asset Type</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            min={1}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Asset Image</label>
          <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex justify-center items-center"
        >
          {loading && <TbFidgetSpinner className="animate-spin mr-2" />}
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
