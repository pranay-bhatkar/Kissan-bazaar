import { useState } from "react";

const QRCodeModal = ({ qrUrl, onClose, onSubmitTransaction }) => {
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = () => {
    if (!transactionId.trim()) return alert("Enter transaction ID");
    onSubmitTransaction(transactionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <h2 className="text-lg font-bold mb-4">Scan & Pay</h2>
        <img
          src={qrUrl}
          alt="GPay QR"
          className="w-full h-64 object-contain mb-4"
        />
        <input
          type="text"
          placeholder="Enter transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
