"use client"

import React, { useState } from "react"
import { Loader2, CheckCircle2, ChevronRight, CalendarDays, Clock } from "lucide-react"
import { createBooking } from "@/lib/api"

interface TestDriveFormProps {
  carId: number
  carName: string
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
]

export function TestDriveForm({ carId, carName }: TestDriveFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Min date: tomorrow
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split("T")[0]

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {}
    if (!data.get("name")) errs.name = "Name is required"
    const email = data.get("email") as string
    if (!email) errs.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email"
    if (!data.get("phone")) errs.phone = "Phone is required"
    if (!data.get("date")) errs.date = "Please choose a date"
    if (!selectedTime) errs.time = "Please choose a time slot"
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

    try {
      const response = await createBooking({
        car_id: carId,
        customer_name: formData.get("name") as string,
        customer_email: formData.get("email") as string,
        customer_phone: formData.get("phone") as string,
        preferred_date: formData.get("date") as string,
        preferred_time: selectedTime!,
        notes: (formData.get("notes") as string) || undefined,
      })

      if (response.success) {
        setIsSuccess(true)
      } else {
        setError(response.message || "Failed to book test drive.")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 text-green-400">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="mb-1.5 text-lg font-black tracking-tight text-white uppercase">
          Drive Booked
        </h3>
        <p className="text-xs text-white/40">
          We&apos;ll confirm your appointment for the {carName} shortly.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false)
            setSelectedTime(null)
          }}
          className="mt-6 rounded-full border border-white/10 px-6 py-2 text-[9px] font-black tracking-widest text-white/40 uppercase hover:border-white/20 hover:text-white transition-all"
        >
          Book Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Name + Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="td-name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          error={fieldErrors.name}
        />
        <FormField
          id="td-phone"
          name="phone"
          type="tel"
          label="Phone"
          placeholder="+1 555 000 0000"
          error={fieldErrors.phone}
        />
      </div>

      {/* Email */}
      <FormField
        id="td-email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        error={fieldErrors.email}
      />

      {/* Date */}
      <div className="space-y-1.5">
        <label
          htmlFor="td-date"
          className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase"
        >
          <CalendarDays size={10} />
          Preferred Date
        </label>
        <input
          id="td-date"
          name="date"
          type="date"
          min={minDateStr}
          className={`w-full rounded-2xl border bg-white/5 px-5 py-3.5 text-xs font-medium text-white transition-all focus:bg-white/8 focus:outline-none scheme-dark ${
            fieldErrors.date ? "border-red-500/50" : "border-white/5 focus:border-white/20"
          }`}
        />
        {fieldErrors.date && (
          <p className="text-[9px] font-bold text-red-400">{fieldErrors.date}</p>
        )}
      </div>

      {/* Time slots */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
          <Clock size={10} />
          Preferred Time
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedTime(slot)}
              className={`rounded-xl py-2 text-[10px] font-black transition-all ${
                selectedTime === slot
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        {fieldErrors.time && (
          <p className="text-[9px] font-bold text-red-400">{fieldErrors.time}</p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label
          htmlFor="td-notes"
          className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase"
        >
          Notes <span className="text-white/20">(optional)</span>
        </label>
        <textarea
          id="td-notes"
          name="notes"
          rows={2}
          placeholder="Morning is best for me…"
          className="w-full resize-none rounded-2xl border border-white/5 bg-white/5 px-5 py-3.5 text-xs font-medium text-white placeholder:text-white/20 transition-all focus:border-white/20 focus:bg-white/8 focus:outline-none"
        />
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
            Request Test Drive
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
}

function FormField({
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
        className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase"
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
