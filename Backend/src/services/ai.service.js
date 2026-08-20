const {
  OLLAMA_URL,
  AI_MODEL,
} = require("../config/ollama.config");
const askAI = async (prompt) => {

  const response = await fetch(OLLAMA_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({

      model: AI_MODEL,

      prompt,

      stream: false,

    }),

  });

  const data = await response.json();

  return data.response;

};

module.exports = askAI;