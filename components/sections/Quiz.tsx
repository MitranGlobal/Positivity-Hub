"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { formatINR, plans, quiz } from "@/lib/content";

const step = {
  enter: (d: number) => ({ opacity: 0, x: d * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -36 }),
};

export default function Quiz() {
  const total = quiz.questions.length;
  const [answers, setAnswers] = useState<number[]>([]);
  const [dir, setDir] = useState(1);
  const current = answers.length;
  const done = current >= total;

  const choose = (weight: number) => {
    setDir(1);
    setAnswers((a) => [...a, weight]);
  };
  const back = () => {
    setDir(-1);
    setAnswers((a) => a.slice(0, -1));
  };
  const restart = () => {
    setDir(-1);
    setAnswers([]);
  };

  const score = answers.reduce((s, w) => s + w, 0);
  const plan = score >= 4 ? plans.find((p) => p.id === "complete")! : plans.find((p) => p.id === "foundation")!;

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="section">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 id="quiz-title" className="section-title">
            {quiz.title}
          </h2>
          <p className="section-lead">{quiz.lead}</p>
        </Reveal>

        <div className="overflow-hidden rounded-panel bg-white p-6 shadow-lift sm:p-10">
          <div className="flex items-center justify-between gap-4 text-sm text-ink-soft">
            <span aria-live="polite">{done ? "Your result" : `Question ${current + 1} of ${total}`}</span>
            {current > 0 && !done && (
              <button type="button" onClick={back} className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium text-ink hover:bg-mist">
                <Icon name="arrow-left" className="h-4 w-4" />
                Back
              </button>
            )}
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist" aria-hidden="true">
            <motion.div className="h-full rounded-full bg-lagoon" animate={{ width: `${(Math.min(current, total) / total) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>

          <div className="relative mt-8 min-h-[300px]">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              {!done ? (
                <motion.fieldset key={`q-${current}`} custom={dir} variants={step} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <legend className="font-display text-display-md text-ink">{quiz.questions[current].q}</legend>
                  <div className="mt-6 grid gap-3">
                    {quiz.questions[current].options.map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => choose(o.weight)}
                        className="flex min-h-[56px] items-center justify-between gap-4 rounded-tile border border-mist-line px-5 py-3 text-left font-medium text-ink transition-colors hover:border-lagoon hover:bg-lagoon/5"
                      >
                        {o.label}
                        <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-ink-faint" />
                      </button>
                    ))}
                  </div>
                </motion.fieldset>
              ) : (
                <motion.div key="result" custom={dir} variants={step} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-ink-soft">We suggest starting with</p>
                  <p className="mt-2 font-display text-display-md text-ink">
                    {plan.name}, {formatINR(plan.price)}
                  </p>
                  <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
                    {plan.id === "complete"
                      ? "You're ready to go deeper. The Complete course adds micro lessons, 3 flagship courses and group masterclasses to the personalised coaching sessions and well-being report."
                      : "A focused start. Foundation gives your child 3 personalised handholding sessions with a certified Transformation Coach and a personalised well-being report."}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href="#pricing" className="btn-primary">
                      See the {plan.name.toLowerCase()}
                    </a>
                    <button type="button" onClick={restart} className="btn-ghost">
                      Retake the quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
