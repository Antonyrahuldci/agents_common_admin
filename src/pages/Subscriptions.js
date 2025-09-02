import React, { useState } from "react";
import { Edit3 } from "lucide-react";

const defaultPlan = {
  originalPrice: "",
  offerPrice: "",
  offerPercent: "",
  videoCount: "",
  aiAvatarImages: "",
  languages: "",
  isActive: false,
  aiRealisticActors: false,
  videoHooks: false,
  customAiVideoHooks: false,
  createYourOwnAvatar: false,
  productInHand: false,
  soundEffectsAndMusic: false,
  exportWithoutWatermark: false,
  aiScriptGeneration: false,
  editVideos: false,
};

const PlanCard = ({ title, plan, onChange, onSave, editMode, onEditClick }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...plan,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md space-y-4">
      {/* <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h3> */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center justify-between">
        <span>{title}</span>
        <button
          onClick={onEditClick}
          className="ml-2 text-gray-500 hover:text-indigo-600"
          title="Edit"
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </h3>

      {[
        { label: "Original Price", name: "originalPrice" },
        { label: "Offer Price", name: "offerPrice" },
        { label: "Offer %", name: "offerPercent" },
        { label: "Video Count", name: "videoCount" },
        { label: "AI Avatar Images", name: "aiAvatarImages" },
        { label: "Languages", name: "languages" },
      ].map(({ label, name }) => (
        <div key={name}>
          <label
            // className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            className={`block text-sm font-medium mb-1 ${
              editMode ? "text-gray-700 dark:text-gray-300" : "text-gray-400"
            }`}
          >
            {label}
          </label>

          <input
            type="number"
            name={name}
            // disabled={!editMode}
            value={plan[name]}
            onChange={handleChange}
            // className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] disabled:opacity-50"
            disabled={!editMode}
            className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[0.5px] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] ${
              !editMode ? "cursor-not-allowed opacity-60" : ""
            }`}
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
            // className="inline-flex items-center text-sm text-gray-700 dark:text-gray-300"
            className={`inline-flex items-center text-sm ${
              !editMode ? "text-gray-400" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <input
              type="checkbox"
              name={field}
              // disabled={!editMode}
              // className="h-5 w-5 accent-[#4F46E5] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded mr-2"
              disabled={!editMode}
              className={`h-5 w-5 accent-[#4F46E5] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded mr-2 ${
                !editMode ? "cursor-not-allowed opacity-60" : ""
              }`}
              checked={plan[field]}
              onChange={handleChange}
            />
            {field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase())}
          </label>
        ))}
      </div>

      {/* Active Toggle */}
      <div className="flex items-center justify-between pt-2">
        <span
          // className="text-sm text-gray-700 dark:text-gray-300"
          className={`text-sm mb-1 ${
            editMode ? "text-gray-700 dark:text-gray-300" : "text-gray-400"
          }`}
        >
          Plan Active
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            disabled={!editMode}
            className="sr-only peer"
            checked={plan.isActive}
            onChange={handleChange}
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

      {/* Save Button */}
      {editMode && (
        <button
          onClick={onSave}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default function Subscriptions() {
  const [startupPlan, setStartupPlan] = useState({ ...defaultPlan });
  const [growthPlan, setGrowthPlan] = useState({ ...defaultPlan });
  const [proPlan, setProPlan] = useState({ ...defaultPlan });

  const [editModes, setEditModes] = useState({
    startup: false,
    growth: false,
    pro: false,
  });

  const toggleEditMode = (planName) => {
    setEditModes((prev) => ({ ...prev, [planName]: !prev[planName] }));
  };

  const handleSave = (planName) => {
    const data = {
      startup: startupPlan,
      growth: growthPlan,
      pro: proPlan,
    }[planName];
    console.log(`${planName.toUpperCase()} PLAN SAVED`, data);

    // Save logic...
    setEditModes((prev) => ({ ...prev, [planName]: false }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Subscription Plans
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlanCard
          title="STARTUP"
          plan={startupPlan}
          onChange={setStartupPlan}
          onSave={() => handleSave("startup")}
          editMode={editModes.startup}
          onEditClick={() => toggleEditMode("startup")}
        />
        <PlanCard
          title="GROWTH"
          plan={growthPlan}
          onChange={setGrowthPlan}
          onSave={() => handleSave("growth")}
          editMode={editModes.growth}
          onEditClick={() => toggleEditMode("growth")}
        />
        <PlanCard
          title="PRO"
          plan={proPlan}
          onChange={setProPlan}
          onSave={() => handleSave("pro")}
          editMode={editModes.pro}
          onEditClick={() => toggleEditMode("pro")}
        />
      </div>
    </div>
  );
}
