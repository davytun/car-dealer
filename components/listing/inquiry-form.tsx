"use client"

import React, { useState } from "react"
import { Loader2, CheckCircle2, ChevronRight } from "lucide-react"
import { createInquiry } from "@/lib/api"

interface InquiryFormProps {
  carId?: number
  carName?: string
  /** When true, renders a full-screen modal overlay; when false (default), renders inline */
  modal?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export function InquiryForm({
  carId,
  carName,
  modal = false,
  isOpen,
  onClose,
}: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {}
    if (!data.get("name")) errs.name = "Name is required"
    const email = data.get("email") as string
    if (!email) errs.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email address"
    if (!data.get("phone")) errs.phone = "Phone number is required"
    if (!data.get("message")) errs.message = "Message is required"
    return errs
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const errs = validate(formData)
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setIsSubmitting(true)

    const data = {
      car_id: carId,
      customer_name: formData.get("name") as string,
      customer_email: formData.get("email") as string,
      customer_phone: formData.get("phone") as string,
      subject: carName ? `Inquiry for ${carName}` : "General Inquiry",
      message: formData.get("message") as string,
    }

    try {
      const response = await createInquiry(data)
      if (response.success) {
        setIsSuccess(true)
        if (modal) {
          setTimeout(() => {
            setIsSuccess(false)
            onClose?.()
          }, 3000)
        }
      } else {
        setError(response.message || "Failed to send inquiry.")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If modal mode but not open, render nothing
  if (modal && !isOpen) return null

  const formContent = isSuccess ? (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-500">
        <CheckCircle2 size={40} />
      </div>
      <h3 className="mb-2 text-xl font-black tracking-tight text-white uppercase">
        Inquiry Sent
      </h3>
      <p className="text-xs font-medium text-white/40">
        Our concierge team will contact you shortly{carName ? ` regarding the ${carName}` : ""}.
      </p>
      {!modal && (
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 rounded-full border border-white/10 px-6 py-2 text-[10px] font-black tracking-widest text-white/50 uppercase transition-all hover:border-white/20 hover:text-white"
        >
          Send Another
        </button>
      )}
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Name + Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id="name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          error={fieldErrors.name}
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          placeholder="+1 555 000 0000"
          error={fieldErrors.phone}
        />
      </div>

      {/* Email */}
      <Field
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        error={fieldErrors.email}
      />

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="text-[9px] font-black tracking-[0.2em] text-white/30 uppercase"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="I'm interested in this vehicle…"
          className={`w-full rounded-2xl border bg-white/5 px-5 py-3.5 text-xs font-medium text-white placeholder:text-white/20 transition-all focus:bg-white/8 focus:outline-none resize-none ${
            fieldErrors.message ? "border-red-500/50" : "border-white/5 focus:border-white/20"
          }`}
        />
        {fieldErrors.message && (
          <p className="text-[9px] font-bold text-red-400">{fieldErrors.message}</p>
        )}
      </div>

      {error && <p className="text-[10px] font-bold text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-black tracking-[0.2em] text-black uppercase shadow-xl transition-all hover:bg-[#f0f0f0] active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            Submit Inquiry
            <ChevronRight
              size={16}
              strokeWidth={3}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  )

  if (!modal) return <div>{formContent}</div>

  // Modal wrapper
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0F172A]/95 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
        <div className="mb-8">
          <span className="mb-2 block text-[9px] font-black tracking-[0.3em] text-white/30 uppercase">
            Acquisition Inquiry
          </span>
          <h3 className="text-2xl font-black tracking-tighter text-white uppercase">
            {carName || "Inquire Now"}
          </h3>
        </div>
        {formContent}
      </div>
    </div>
  )
}

// Field subcomponent
function Field({
  id,
  name,
  type,
  label,
  placeholder,
  error,
}: {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  error?: string
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-[9px] font-black tracking-[0.2em] text-white/30 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white/5 px-5 py-3.5 text-xs font-medium text-white placeholder:text-white/20 transition-all focus:bg-white/8 focus:outline-none ${
          error ? "border-red-500/50" : "border-white/5 focus:border-white/20"
        }`}
      />
      {error && <p className="text-[9px] font-bold text-red-400">{error}</p>}
    </div>
  )
}
