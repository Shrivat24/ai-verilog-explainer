import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Verilog expert. Explain Verilog code in beginner-friendly language.",
        },
        {
          role: "user",
          content: `Explain this Verilog code:\n\n${body.code}`,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    return Response.json({
      explanation:
        completion.choices[0]?.message?.content ||
        "No explanation generated.",
    });
  } catch (error: any) {
    console.error("GROQ ERROR:", error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}