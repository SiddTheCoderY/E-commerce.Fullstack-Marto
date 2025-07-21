import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { promoteUserToSeller } from "../../features/user/userThunks";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SellerDetails({}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phoneNumber: "",
    age: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.phoneNumber || !form.age || !form.address) {
      setError("Please fill all the required fields.");
      return;
    }
    if (isNaN(form.age) || form.age < 18) {
      setError("Please enter a valid age (18+).");
      return;
    }
    setError("");

    try {
      const loadingToast = toast.loading("Promoting to seller...");
      await dispatch(promoteUserToSeller(form)).unwrap();
      toast.dismiss(loadingToast);
      const toastId = toast.success("🎉 Promoted to Seller successfully!");
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
      navigate("/");
    } catch (error) {
      toast.error("Failed to promote to seller");
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-center">
        <span className="highlight-tilt px-4 ">Anbari</span> Seller Details
      </h2>

      <p className="text-gray-700">
        Please provide the following details to complete your seller
        registration:
      </p>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="+977-98XXXXXXXX"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="age" className="block font-semibold mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
            min={18}
            placeholder="18"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="businessAddress" className="block font-semibold mb-1">
            Business Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="businessAddress"
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            placeholder="Enter your business address"
            className="w-full max-h-40 rounded-md border border-gray-300 px-3 py-2 resize-y"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellerDetails;
