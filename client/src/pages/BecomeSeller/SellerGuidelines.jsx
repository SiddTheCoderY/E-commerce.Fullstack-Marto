import React, { useState } from "react";

export default function SellerGuidelines({setGuidelinesAccepted}) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setGuidelinesAccepted(true);
  };

  const guidelines = [
    "Provide accurate product descriptions with clear images.",
    "Ensure timely dispatch and delivery of orders.",
    "Respond to customer inquiries within 24 hours.",
    "Maintain a return-friendly and transparent policy.",
    "List only legal and permitted items on Anbari.",
    "Keep pricing fair and competitive.",
    "Do not spam or manipulate ratings/reviews.",
    "Comply with all Anbari seller policies and local laws.",
  ];

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-center">
        <span className="highlight-tilt px-4 ">Anbari</span> Seller Guidelines
      </h2>

      <ul className="list-disc list-inside text-gray-700 space-y-2">
        {guidelines.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>

      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="checkbox"
          checked={accepted}
          onChange={() => setAccepted(!accepted)}
          className="w-4 h-4 text-blue-600"
        />
        <span>I accept these guidelines</span>
      </label>

      <div className="flex justify-end w-full relative top-20">
        <button
          onClick={handleAccept}
          className={`w-40 py-2 rounded-lg font-semibold transition ${
            accepted
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!accepted}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
