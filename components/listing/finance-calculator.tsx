"use client"

import React, { useState, useMemo } from "react"

interface FinanceCalculatorProps {
  priceRaw: number
}

const TERMS = [24, 36, 48, 60, 72]

export function FinanceCalculator({ priceRaw }: FinanceCalculatorProps) {
  const [downPct, setDownPct] = useState(20)
  const [term, setTerm] = useState(60)
  const [rate, setRate] = useState(6.9)

  const monthly = useMemo(() => {
    const downAmount = (downPct / 100) * priceRaw
    const principal = priceRaw - downAmount
    const monthlyRate = rate / 100 / 12
    if (monthlyRate === 0) return principal / term
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1)
    )
  }, [priceRaw, downPct, term, rate])

  const downAmount = (downPct / 100) * priceRaw
  const totalInterest = monthly * term - (priceRaw - downAmount)

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-white/5 bg-white/5 p-6 text-center">
        <div className="mb-1 text-[9px] font-black tracking-[0.3em] text-white/30 uppercase">
          Estimated Monthly Payment
        </div>
        <div className="text-4xl font-black tracking-tighter text-white">
          {fmt(monthly)}
          <span className="text-base font-bold text-white/30">/mo</span>
        </div>
        <div className="mt-2 text-[10px] text-white/30">
          {term} months · {rate}% APR · {downPct}% down
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Down Payment", value: fmt(downAmount) },
          { label: "Loan Amount", value: fmt(priceRaw - downAmount) },
          { label: "Total Interest", value: fmt(totalInterest) },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-white/5 bg-white/3 p-3">
            <div className="text-[8px] font-black tracking-widest text-white/30 uppercase">
              {label}
            </div>
            <div className="mt-1 text-xs font-black text-white/80">{value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[9px] font-black tracking-[0.2em] text-white/40 uppercase">
            Down Payment
          </label>
          <span className="text-xs font-black text-white">{downPct}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={50}
          step={5}
          value={downPct}
          onChange={(e) => setDownPct(Number(e.target.value))}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-[9px] text-white/20">
          <span>0%</span>
          <span>50%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[9px] font-black tracking-[0.2em] text-white/40 uppercase">
            Interest Rate (APR)
          </label>
          <span className="text-xs font-black text-white">{rate.toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-[9px] text-white/20">
          <span>1%</span>
          <span>20%</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-black tracking-[0.2em] text-white/40 uppercase">
          Loan Term
        </label>
        <div className="grid grid-cols-5 gap-2">
          {TERMS.map((t) => (
            <button
              key={t}
              onClick={() => setTerm(t)}
              className={`rounded-xl py-2 text-[10px] font-black transition-all ${
                term === t
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {t}mo
            </button>
          ))}
        </div>
      </div>

      <p className="text-[9px] leading-relaxed text-white/20">
        Estimates are for illustration only and do not constitute a financing offer. Actual rates depend on credit approval.
      </p>
    </div>
  )
}
