import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const QRCodeModal = ({ qrUrl, onClose, onSubmitTransaction }) => {
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!transactionId.trim()) {
      setError("Transaction ID is required");
      return;
    }

    setError("");
    onSubmitTransaction(transactionId.trim());
    onClose();
  };

  useEffect(() => {
    // Prevent scroll behind modal
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative animate-fade-in-up">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <IoClose size={22} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-green-700 mb-4">
          Scan & Pay via QR
        </h2>

        {/* QR Image */}
        <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded mb-4 overflow-hidden p-2 ">
          <img src={qrUrl} alt="QR Code" className="h-full object-contain rounded-lg  border-2" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className={`w-full p-3 rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-between gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
