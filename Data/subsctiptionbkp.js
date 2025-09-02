import React, { useState } from "react";

export default function Subscriptions() {
  const [plans, setPlans] = useState([
    {
      name: "STARTUP",
      originalPrice: 49,
      discountedPrice: 39,
      offerPercentage: 30,
      videoCount: 5,
      aiAvatarImagesCount: 125,
      availableLanguageCount: 29,
      aiRealisticActors: true,
      videoHooks: true,
      customAiVideoHooks: true,
      createYourOwnAvatar: false,
      productInHand: false,
      soundEffectsAndMusic: true,
      exportWithoutWatermark: true,
      aiScriptGeneration: true,
      editVideos: true,
      isActive: true,
    },
    {
      name: "GROWTH",
      originalPrice: 69,
      discountedPrice: 59,
      offerPercentage: 30,
      videoCount: 10,
      aiAvatarImagesCount: 200,
      availableLanguageCount: 29,
      aiRealisticActors: true,
      videoHooks: true,
      customAiVideoHooks: true,
      createYourOwnAvatar: false,
      productInHand: false,
      soundEffectsAndMusic: true,
      exportWithoutWatermark: true,
      aiScriptGeneration: true,
      editVideos: true,
      isActive: true,
    },
    {
      name: "PRO",
      originalPrice: 119,
      discountedPrice: 99,
      offerPercentage: 30,
      videoCount: 20,
      aiAvatarImagesCount: 300,
      availableLanguageCount: 29,
      aiRealisticActors: true,
      videoHooks: true,
      customAiVideoHooks: true,
      createYourOwnAvatar: true,
      productInHand: true,
      soundEffectsAndMusic: true,
      exportWithoutWatermark: true,
      aiScriptGeneration: true,
      editVideos: true,
      isActive: true,
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const handleSave = (index) => {
    const plan = plans[index];
    console.log("Saving plan:", plan);
    // Your API call or save logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subscription Plans
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and edit your pricing and feature options.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Monthly Subscription Plans
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            STARTUP
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Original Price
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Offer Price
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Offer %
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Video Count
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              AI Avatar Images
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Languages
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>
        </div>
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {plan.name}
            </h3>

            {[
              { label: "Original Price", field: "originalPrice" },
              { label: "Offer Price", field: "discountedPrice" },
              { label: "Offer %", field: "offerPercentage" },
              { label: "Video Count", field: "videoCount" },
              { label: "AI Avatar Images", field: "aiAvatarImagesCount" },
              { label: "Languages", field: "availableLanguageCount" },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {label}
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
                  value={plan[field]}
                  onChange={(e) =>
                    handleChange(index, field, Number(e.target.value))
                  }
                />
              </div>
            ))}

            <hr className="my-3 border-gray-300 dark:border-gray-700" />

            <div className="grid grid-cols-1 gap-2">
              {[
                "aiRealisticActors",
                "videoHooks",
                "customAiVideoHooks",
                "createYourOwnAvatar",
                "productInHand",
                "soundEffectsAndMusic",
                "exportWithoutWatermark",
                "aiScriptGeneration",
                "editVideos",
              ].map((field) => (
                <label
                  key={field}
                  className="inline-flex items-center text-sm text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#4F46E5] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded mr-2"
                    checked={plan[field]}
                    onChange={() => handleChange(index, field, !plan[field])}
                  />
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                </label>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Plan Active
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={plan.isActive}
                  onChange={() =>
                    handleChange(index, "isActive", !plan.isActive)
                  }
                />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 dark:bg-gray-700 dark:peer-checked:bg-green-600 rounded-full peer relative transition-all">
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      plan.isActive ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            <button
              onClick={() => handleSave(index)}
              className="bg-[#4F46E5] hover:bg-[#4338ca] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
