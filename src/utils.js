function getFullUrl(endpoint) {
  try {
    const proxy = "http://localhost:8000";
    // const proxy = "http://16.16.37.84";
    return `${proxy}${endpoint}`;
  } catch (error) { 
    console.error("Error reading package.json:", error.message);
    return endpoint; // Fallback to return just the endpoint
  }
}

export { getFullUrl };
