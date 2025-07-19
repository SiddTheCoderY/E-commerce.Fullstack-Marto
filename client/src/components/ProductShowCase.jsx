import { useParams, useNavigate } from "react-router-dom";

export default function ProductShowcase({ isModal = false }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  return (
    <div
      className={`${
        isModal
          ? "fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
          : "relative"
      }`}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative">
        {isModal && (
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={handleClose}
          >
            ✕
          </button>
        )}
        <h2 className="text-xl font-semibold mb-2">
          Product Modal - ID: {productId}
        </h2>
        {/* render actual product details */}
      </div>
    </div>
  );
}
