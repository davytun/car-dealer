"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2, Send } from "lucide-react"
import { createInquiry } from "@/lib/api"

export function AdviceInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    
    const formData = new FormData(e.currentTarget)
    const data = {
      customer_name: formData.get("name") as string,
      customer_email: formData.get("email") as string,
      customer_phone: formData.get("phone") as string,
      subject: "Specialized Advice: Concierge Service Inquiry",
      message: formData.get("message") as string,
    }

    try {
      const response = await createInquiry(data)
      if (response.success) {
        setStatus("success")
        // Reset after 5 seconds
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setErrorMessage(response.message || "Something went wrong.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Failed to send inquiry. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center rounded-3xl border border-white/10 bg-white/2"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-500">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="mb-2 text-2xl font-black tracking-tight text-white uppercase">
          Inquiry Received
        </h3>
        <p className="text-sm font-medium text-white/40 max-w-sm px-6">
          Thank you for choosing Ignite Luxury. A concierge specialist will reach out shortly for your specialized advice.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 text-[10px] font-black tracking-widest text-white/40 hover:text-white uppercase transition-colors underline underline-offset-4"
        >
          Send another inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase ml-4">Full Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="HOW SHOULD WE ADDRESS YOU?"
            className="w-full bg-white/2 border border-white/5 rounded-2xl py-5 px-8 text-[10px] text-white tracking-widest font-bold focus:border-white/20 focus:bg-white/5 focus:outline-none transition-all placeholder:text-white/10"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase ml-4">Email Address</label>
          <input
            name="email"
            type="email"
            required
            placeholder="WHERE CAN WE REACH YOU?"
            className="w-full bg-white/2 border border-white/5 rounded-2xl py-5 px-8 text-[10px] text-white tracking-widest font-bold focus:border-white/20 focus:bg-white/5 focus:outline-none transition-all placeholder:text-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase ml-4">Phone Number</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="+234 ..."
            className="w-full bg-white/2 border border-white/5 rounded-2xl py-5 px-8 text-[10px] text-white tracking-widest font-bold focus:border-white/20 focus:bg-white/5 focus:outline-none transition-all placeholder:text-white/10"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase ml-4">Subject</label>
          <input
            name="subject"
            type="text"
            readOnly
            value="Concierge Advice Inquiry"
            className="w-full bg-white/2 border border-white/5 rounded-2xl py-5 px-8 text-[10px] text-white/40 tracking-widest font-bold focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase ml-4">Message</label>
        <textarea
          name="message"
          rows={6}
          required
          placeholder="HOW CAN OUR CONCIERGE ASSIST YOU TODAY?"
          className="w-full bg-white/2 border border-white/5 rounded-3xl py-6 px-8 text-[10px] text-white tracking-widest font-bold focus:border-white/20 focus:bg-white/5 focus:outline-none transition-all placeholder:text-white/10 resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-xs font-bold text-red-500/80 ml-4">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative w-full md:w-auto min-w-[240px] flex items-center justify-center gap-4 rounded-full bg-white px-12 py-6 text-[10px] font-black tracking-[0.3em] text-black uppercase transition-all hover:bg-white/90 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            Send Inquiry
            <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </>
        )}
      </button>
    </form>
  )
}
