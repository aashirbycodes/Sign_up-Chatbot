import { useRef, useState } from "react";
import axios from "axios";
import { Show } from "@clerk/react";

function Chatbot() {
  const [userQuery, setUserQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const requestInProgress = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const question = userQuery.trim();

    if (!question || requestInProgress.current) {
      return;
    }

    requestInProgress.current = true;
    setIsLoading(true);
    setError("");
    setConversation((messages) => [...messages, { role: "user", message: question }]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY is missing from your .env file.");
      }

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: "You are a helpful software engineer. Answer only software-engineering-related questions, politely refuse unrelated questions, and keep answers to two lines.",
                },
                { text: question },
              ],
            },
          ],
        },
        {
          headers: {
            "x-goog-api-key": apiKey,
            "Content-Type": "application/json",
          },
        },
      );

      const reply = response.data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join("\n");

      if (!reply) {
        throw new Error("Gemini returned no answer. Check whether the request was blocked.");
      }

      setConversation((messages) => [...messages, { role: "assistant", message: reply }]);
      setUserQuery("");
    } catch (requestError) {
      const apiError = requestError.response?.data?.error?.message;
      setError(apiError || requestError.message || "The chatbot could not get a response.");
    } finally {
      requestInProgress.current = false;
      setIsLoading(false);
    }
  }

  return (
    <Show when="signed-in">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-950 to-amber-950 px-4 py-8 text-white sm:px-8">
        <div className="w-full max-w-2xl">
          <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
            Syed Aashir Ali&apos;s AI Chatbot
          </h1>
          <div aria-live="polite">
            {conversation.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={message.role === "user" ? "user-message" : "assistant-message"}
              >
                <strong>
                  {message.role === "user" ? "You" : "Assistant"}: {message.message}
                </strong>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg sm:flex-row"
        >
          <input
            type="text"
            name="userQuery"
            id="userQuery"
            value={userQuery}
            onChange={(event) => setUserQuery(event.target.value)}
            placeholder="Type a message"
            disabled={isLoading}
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-purple-400 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !userQuery.trim()}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>
        {error && (
          <p role="alert" className="mt-4 w-full max-w-2xl text-sm text-red-300">
            Could not get a reply: {error}
          </p>
        )}
      </div>
    </Show>
  );
}

export default Chatbot;