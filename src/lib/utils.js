// src/lib/utils.js
// frontend/utils/api.js

export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    // HERE IS THE MISSING LINK
    if (response.status === 429) {
      // 1. Dispatch the event your App.jsx is listening for
      window.dispatchEvent(new Event("rate-limited"));
      
      // 2. Throw an error so the specific page stops processing
      throw new Error("Rate limit exceeded");
    }

    return response;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};
// Standard date (Oct 24, 2023)
export const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

// Philippine Time (Oct 24, 2023, 10:30 AM)
export const formatPHDate = (date) => {
  if (!date) return "";
  
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};