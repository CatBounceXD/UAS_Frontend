"use client";

import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import type { DoctorRecord } from "@/features/doctors/queries";
import type { VisitRequestPayload } from "@/features/visit-request/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

const STEPS = [
  { number: 1, label: "Patient Information" },
  { number: 2, label: "Insurance Information" },
  { number: 3, label: "Appointment Information" },
] as const;

const inputClassName =
  "w-full rounded-lg border border-transparent bg-[#F4F6F9] px-4 py-3 text-sm text-[#163A5F] placeholder:text-slate-400 transition focus:border-[#1D9BF0] focus:bg-white focus:outline-none";

const labelClassName = "mb-2 block text-sm font-medium text-[#163A5F]";

export default function DoctorAppointmentClient({
  doctor,
  defaultValues,
}: {
  doctor: DoctorRecord;
  defaultValues?: Partial<VisitRequestPayload>;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<VisitRequestPayload>({
    // Step 1: Patient Information
    name: defaultValues?.name ?? "",
    email: defaultValues?.email ?? "",
    dateOfBirth: defaultValues?.dateOfBirth ?? "",
    addressLine1: defaultValues?.addressLine1 ?? "",
    addressLine2: defaultValues?.addressLine2 ?? "",
    city: defaultValues?.city ?? "",
    state: defaultValues?.state ?? "",
    zipcode: defaultValues?.zipcode ?? "",
    preferredContactMethod: defaultValues?.preferredContactMethod ?? "",
    contactInfo: defaultValues?.contactInfo ?? "",
    referralSource: defaultValues?.referralSource ?? "",
    ssn: defaultValues?.ssn ?? "",

    // Step 2: Insurance Information
    isPolicyHolderSameAsPatient:
      defaultValues?.isPolicyHolderSameAsPatient ?? true,
    policyHolderName: defaultValues?.policyHolderName ?? "",
    healthInsurancePlan: defaultValues?.healthInsurancePlan ?? "",
    healthInsuranceNumber: defaultValues?.healthInsuranceNumber ?? "",
    groupNumber: defaultValues?.groupNumber ?? "",

    // Step 3: Appointment Information
    doctorName: doctor.name,
    doctorSpecialty: doctor.specialty,
    preferredAppointmentTime: "Morning",
    urgency: "Next Available",
    reasonForVisit: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = <K extends keyof VisitRequestPayload>(
    field: K,
    value: VisitRequestPayload[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePolicyHolderToggle = (isSame: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isPolicyHolderSameAsPatient: isSame,
      policyHolderName: isSame ? prev.name : "",
    }));
  };

  const validateStep1 = (): string | null => {
    if (!formData.name.trim()) return "Nama lengkap wajib diisi.";
    if (!formData.email.trim()) return "Email wajib diisi.";
    if (!formData.dateOfBirth.trim()) return "Tanggal lahir wajib diisi.";
    if (!formData.addressLine1.trim()) return "Address Line 1 wajib diisi.";
    if (!formData.city.trim()) return "City wajib diisi.";
    if (!formData.state.trim()) return "State wajib diisi.";
    if (!formData.zipcode.trim()) return "Zipcode wajib diisi.";
    if (!formData.preferredContactMethod.trim())
      return "Pilih metode kontak yang diinginkan.";
    if (!formData.contactInfo.trim()) return "Contact Info wajib diisi.";
    return null;
  };

  const validateStep2 = (): string | null => {
    if (!formData.policyHolderName.trim())
      return "Policy Holder Name wajib diisi.";
    if (!formData.healthInsurancePlan.trim())
      return "Health Insurance Plan wajib diisi.";
    if (!formData.healthInsuranceNumber.trim())
      return "Health Insurance Number wajib diisi.";
    return null;
  };

  const validateStep3 = (): string | null => {
    if (!formData.reasonForVisit.trim()) return "Reason for Visit wajib diisi.";
    return null;
  };

  const handleNextStep = () => {
    setErrorMessage(null);

    if (currentStep === 1) {
      const err = validateStep1();
      if (err) {
        setErrorMessage(err);
        return;
      }
      if (formData.isPolicyHolderSameAsPatient) {
        setFormData((prev) => ({
          ...prev,
          policyHolderName: prev.policyHolderName || prev.name,
        }));
      }
    }

    if (currentStep === 2) {
      const err = validateStep2();
      if (err) {
        setErrorMessage(err);
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep < 3) {
      handleNextStep();
      return;
    }

    const step3Err = validateStep3();
    if (step3Err) {
      setErrorMessage(step3Err);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/visit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          doctorId: doctor.id,
          doctorName: doctor.name,
          doctorSpecialty: doctor.specialty,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          json?.message ||
            json?.error ||
            "Gagal mengirim permintaan appointment. Coba lagi.",
        );
      }

      setIsSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Gagal mengirim permintaan appointment. Coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-[#1D9BF0]" />
          <h1 className="text-2xl font-bold text-[#163A5F]">
            Appointment Requested
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Permintaan janji temu dengan{" "}
            <span className="font-semibold text-[#163A5F]">{doctor.name}</span>{" "}
            berhasil dikirim. Kami akan menghubungi Anda segera.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/visit-request"
              className="inline-block rounded-lg bg-[#1D9BF0] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#1989d6]"
            >
              Lihat Daftar Kunjungan
            </Link>
            <Link
              href="/dashboard"
              className="inline-block rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
        {/* Main White Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          {/* Stepper Indicator */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {STEPS.map((step, index) => {
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <div key={step.number} className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                        isCompleted
                          ? "bg-[#1D9BF0] text-white"
                          : isActive
                            ? "bg-[#163A5F] text-white"
                            : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium sm:text-sm ${
                        isCompleted
                          ? "text-[#1D9BF0]"
                          : isActive
                            ? "text-[#163A5F]"
                            : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index < STEPS.length - 1 && (
                    <div
                      className={`hidden w-10 sm:block md:w-14 ${
                        currentStep > step.number
                          ? "border-t-2 border-[#1D9BF0]"
                          : "border-t-2 border-dashed border-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Section Title with Back Chevron */}
          <div className="mb-7 border-b border-slate-100 pb-4">
            {currentStep === 1 ? (
              <Link
                href={`/doctors/${doctor.id}`}
                className="inline-flex items-center gap-1.5 text-xl font-bold text-[#163A5F] transition hover:text-[#1D9BF0]"
              >
                <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                <span>{STEPS[0].label}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 text-left text-xl font-bold text-[#163A5F] transition hover:text-[#1D9BF0]"
              >
                <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                <span>{STEPS[currentStep - 1]?.label}</span>
              </button>
            )}
          </div>

          {/* STEP 1: Patient Information */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-3">
              <div>
                <label htmlFor="name" className={labelClassName}>
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="ex. John smith"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClassName}>
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ex. john.smith@domain.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className={labelClassName}>
                  Date of Birth *
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="addressLine1" className={labelClassName}>
                  Address Line 1 *
                </label>
                <input
                  id="addressLine1"
                  type="text"
                  placeholder="ex. 6033 Collins Inlet"
                  value={formData.addressLine1}
                  onChange={(e) => updateField("addressLine1", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="addressLine2" className={labelClassName}>
                  Address Line 2
                </label>
                <input
                  id="addressLine2"
                  type="text"
                  placeholder="ex. Apt 4B"
                  value={formData.addressLine2}
                  onChange={(e) => updateField("addressLine2", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="city" className={labelClassName}>
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="ex. West Gina"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="state" className={labelClassName}>
                  State *
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="ex. New York"
                  value={formData.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="zipcode" className={labelClassName}>
                  Zipcode *
                </label>
                <input
                  id="zipcode"
                  type="text"
                  placeholder="ex. 70945"
                  value={formData.zipcode}
                  onChange={(e) => updateField("zipcode", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="preferredContactMethod"
                  className={labelClassName}
                >
                  How may we contact you: *
                </label>
                <div className="relative">
                  <select
                    id="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={(e) =>
                      updateField("preferredContactMethod", e.target.value)
                    }
                    className={`${inputClassName} appearance-none pr-10 ${
                      formData.preferredContactMethod === ""
                        ? "text-slate-400"
                        : "text-[#163A5F]"
                    }`}
                  >
                    <option value="">Select one</option>
                    <option value="Phone">Phone</option>
                    <option value="Email">Email</option>
                    <option value="Text Message">Text Message</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#163A5F]" />
                </div>
              </div>

              <div>
                <label htmlFor="contactInfo" className={labelClassName}>
                  Contact Info *
                </label>
                <input
                  id="contactInfo"
                  type="text"
                  placeholder="ex. 081234567890"
                  value={formData.contactInfo}
                  onChange={(e) => updateField("contactInfo", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="referralSource" className={labelClassName}>
                  How did you hear about us
                </label>
                <div className="relative">
                  <select
                    id="referralSource"
                    value={formData.referralSource}
                    onChange={(e) =>
                      updateField("referralSource", e.target.value)
                    }
                    className={`${inputClassName} appearance-none pr-10 ${
                      formData.referralSource === ""
                        ? "text-slate-400"
                        : "text-[#163A5F]"
                    }`}
                  >
                    <option value="">Select one</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend or Family">Friend or Family</option>
                    <option value="Doctor Referral">Doctor Referral</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#163A5F]" />
                </div>
              </div>

              <div>
                <label htmlFor="ssn" className={labelClassName}>
                  Social Security Number
                </label>
                <input
                  id="ssn"
                  type="text"
                  placeholder="0 123 456 7890"
                  value={formData.ssn}
                  onChange={(e) => updateField("ssn", e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Insurance Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-sm font-semibold text-[#163A5F]">
                  Is the Policy Holder the same as the Patient?
                </span>

                <div className="flex items-center gap-6">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#163A5F]">
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="policyHolderSame"
                      checked={formData.isPolicyHolderSameAsPatient}
                      onChange={() => handlePolicyHolderToggle(true)}
                      className="h-4 w-4 accent-[#1D9BF0]"
                    />
                  </label>

                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#163A5F]">
                    <span>No</span>
                    <input
                      type="radio"
                      name="policyHolderSame"
                      checked={!formData.isPolicyHolderSameAsPatient}
                      onChange={() => handlePolicyHolderToggle(false)}
                      className="h-4 w-4 accent-[#1D9BF0]"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                <div>
                  <label htmlFor="policyHolderName" className={labelClassName}>
                    Policy Holder Name *
                  </label>
                  <input
                    id="policyHolderName"
                    type="text"
                    placeholder="ex. John smith"
                    value={formData.policyHolderName}
                    onChange={(e) =>
                      updateField("policyHolderName", e.target.value)
                    }
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="healthInsurancePlan"
                    className={labelClassName}
                  >
                    Health Insurance Plan *
                  </label>
                  <input
                    id="healthInsurancePlan"
                    type="text"
                    placeholder="ex. BlueCross Comprehensive Care"
                    value={formData.healthInsurancePlan}
                    onChange={(e) =>
                      updateField("healthInsurancePlan", e.target.value)
                    }
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="healthInsuranceNumber"
                    className={labelClassName}
                  >
                    Health Insurance Number *
                  </label>
                  <input
                    id="healthInsuranceNumber"
                    type="text"
                    placeholder="ex. 0 123 456 789"
                    value={formData.healthInsuranceNumber}
                    onChange={(e) =>
                      updateField("healthInsuranceNumber", e.target.value)
                    }
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="groupNumber" className={labelClassName}>
                    Group Number
                  </label>
                  <input
                    id="groupNumber"
                    type="text"
                    placeholder="ex. 0 123 456 789"
                    value={formData.groupNumber}
                    onChange={(e) => updateField("groupNumber", e.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Appointment Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Doctor Profile Summary */}
              <div className="flex items-center gap-3.5">
                <Avatar className="h-12 w-12 border border-slate-100">
                  <AvatarImage
                    src={doctor.avatarUrl}
                    alt={doctor.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-slate-200 text-sm font-bold text-[#163A5F]">
                    {doctor.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-base font-bold text-[#163A5F]">
                    {doctor.name}
                  </h2>
                  <p className="text-xs text-slate-400">{doctor.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="preferredAppointmentTime"
                    className={labelClassName}
                  >
                    Preferred Appointment Time
                  </label>
                  <div className="relative">
                    <select
                      id="preferredAppointmentTime"
                      value={formData.preferredAppointmentTime}
                      onChange={(e) =>
                        updateField("preferredAppointmentTime", e.target.value)
                      }
                      className={`${inputClassName} appearance-none pr-10 text-slate-500`}
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#163A5F]" />
                  </div>
                </div>

                <div>
                  <label htmlFor="urgency" className={labelClassName}>
                    Urgency
                  </label>
                  <div className="relative">
                    <select
                      id="urgency"
                      value={formData.urgency}
                      onChange={(e) => updateField("urgency", e.target.value)}
                      className={`${inputClassName} appearance-none pr-10 text-slate-500`}
                    >
                      <option value="Next Available">Next Available</option>
                      <option value="Within 24 Hours">Within 24 Hours</option>
                      <option value="This Week">This Week</option>
                      <option value="Routine">Routine</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#163A5F]" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="reasonForVisit" className={labelClassName}>
                  Reason for Visit *
                </label>
                <textarea
                  id="reasonForVisit"
                  rows={5}
                  placeholder="Type here..."
                  value={formData.reasonForVisit}
                  onChange={(e) =>
                    updateField("reasonForVisit", e.target.value)
                  }
                  className={`${inputClassName} resize-none`}
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <p className="mt-5 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Bottom Right Action Button */}
        <div className="mt-6 flex justify-end">
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="min-w-32 rounded-lg bg-[#1D9BF0] px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1989d6]"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1D9BF0] px-7 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1989d6] disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Request Appointment</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
