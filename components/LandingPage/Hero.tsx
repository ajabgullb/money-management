import React, { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AccordionItem from './AccordianItem';
import JoinWaitlist from './JoinWaitlist';
import auth from "@/lib/auth"

const Hero = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const features = useMemo(
    () => [
      {
        title: "Custom Envelopes",
        desc: "Create envelopes for rent, groceries, savings, or your side hustle.",
        icon: "🔖",
      },
      {
        title: "Real-time Balances",
        desc: "See updated balances after every transaction—no spreadsheets.",
        icon: "⚡",
      },
      {
        title: "Cash-first Friendly",
        desc: "Perfect for cash budgeting now, with bank sync coming soon.",
        icon: "💸",
      },
      {
        title: "Insights & Trends",
        desc: "Track spending trends and get nudges before you overspend.",
        icon: "📈",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "What is the envelope method?",
        a: "It's a budgeting approach where you allocate money into category ‘envelopes’ so every rupee has a job.",
      },
      {
        q: "Is it free?",
        a: "We'll start with a generous free tier during beta while we shape the product with early users.",
      },
      {
        q: "Do I need to connect my bank?",
        a: "No. You can start with manual or cash-first tracking. Bank sync will be optional later.",
      },
    ],
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (loading) return; // prevent double submit

    const isValid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
    if (!isValid) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const data = await auth.waitlistSignup(email);
      console.log(data);
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="relative flex min-h-screen flex-col bg-gradient-to-b from-white to-green-50">
      {/* Decorative gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[36rem] bg-gradient-to-tr from-green-200 via-green-400 to-emerald-300 opacity-20 animate-in fade-in zoom-in duration-700 rounded-full"
          style={{ clipPath: "polygon(74% 44%, 100% 76%, 82% 100%, 32% 93%, 0 66%, 23% 30%, 55% 23%)" }}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
              ✨ Beta opens soon
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Give every rupee a job
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Build a budget that actually sticks with simple, powerful envelopes.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? "email-error" : undefined}
                  className="h-10"
                />
                <p
                  id="email-error"
                  aria-live="polite"
                  className={`mt-1 h-5 text-sm ${error ? "text-destructive visible" : "invisible"} sm:absolute sm:left-0 sm:top-full sm:mt-1 sm:whitespace-nowrap sm:pointer-events-none`}
                >
                  {error ?? "placeholder"}
                </p>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading || submitted}
                className="sm:w-auto cursor-pointer bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : submitted ? (
                  "Thanks for joining!"
                ) : (
                  "Get Early Access"
                )}
              </Button>
            </form>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 md:justify-start">
              <span>✅ No spam</span>
              <span>•</span>
              <span>🔒 Privacy-first</span>
              <span>•</span>
              <span>🚀 Get early perks</span>
            </div>
          </div>

          {/* Right: Preview card */}
          <div className="order-first md:order-none">
            <div className="mx-auto max-w-sm rounded-2xl border bg-white p-5 shadow-xl ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">Monthly Budget</div>
                <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">On track</div>
              </div>
              <div className="mt-4 space-y-3">
                {["Rent", "Groceries", "Savings"].map((label, i) => (
                  <div key={label} className="rounded-xl border p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-800">{label}</span>
                      <span className="text-gray-500">Rs. {[20000, 6000, 8000][i]}</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-green-500 transition-all duration-700"
                        style={{ width: ["78%", "45%", "60%"][i] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:py-16">
        <h2 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">
          Why this app?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Stay on budget with clarity, control, and a system that adapts to you.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
              <div className="mt-4 h-1 w-10 origin-left scale-x-0 rounded-full bg-green-500 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Join Waitlist CTA */}
      <JoinWaitlist />

      {/* FAQ */}
      <section className="mx-auto w-full max-w-4xl px-5 pb-20">
        <h2 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">FAQ</h2>
        <div className="mt-8 divide-y rounded-2xl border bg-white">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} title={item.q}>
              {item.a}
            </AccordionItem>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button 
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} variant="outline">
            Back to top
          </Button>
        </div>
      </section>

    </main>
    </div>
  )
}

export default Hero
