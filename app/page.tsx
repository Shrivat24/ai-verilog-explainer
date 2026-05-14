"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const explainCode = async () => {
    setLoading(true);

    const res = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    console.log(data);

setResponse(data.explanation || data.error || "No response received");;
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-4 text-center">
          AI Verilog Explainer
        </h1>

        <p className="text-gray-400 text-center mb-10">
          Paste your Verilog code and get instant AI explanations
        </p>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-sm font-mono focus:outline-none"
          placeholder="Paste your Verilog code here..."
        />

        <button
          onClick={explainCode}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-all rounded-xl py-4 font-semibold"
        >
          {loading ? "Explaining..." : "Explain Code"}
        </button>

        {response && (
          <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-xl p-6 whitespace-pre-wrap">
            {response}
          </div>
        )}

      </div>
    </main>
  );
}