import { ArrowLeft, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentSection from "@/shared/components/CommentSection";

const articles = [
  {
    id: "article-1",
    image: "/Resource1.png",
    title: "Adult Reconstruction",
    description: "Learn more about Stryker's Mako Total Hip Replacement.",
    date: "12-Aug-2022",
    author: "John Smith",
    comments: 8,
    introduction:
      "Adult reconstruction is a specialized area of orthopedic care that focuses on treating conditions affecting joints, particularly the hip and knee. These treatments aim to improve joint function, mobility, and quality of life.",
    heading: "Understanding Joint Reconstruction",
    paragraphs: [
      "Joint reconstruction procedures may be considered when joint damage or disease affects a person's ability to perform everyday activities. Treatment options depend on the patient's condition and individual medical needs.",
      "One of the technologies used in modern orthopedic surgery is the Mako SmartRobotics system by Stryker. This technology supports surgeons during certain joint replacement procedures through detailed planning and robotic-arm assistance.",
    ],
    quote:
      "Modern orthopedic care combines medical expertise and technology to support better treatment planning and patient care.",
    closing:
      "Understanding available treatment options is an important first step. Patients should consult qualified orthopedic specialists to discuss the most appropriate care for their individual conditions.",
  },
  {
    id: "article-2",
    image: "/Resource2.png",
    title: "Orthopedic Treatment",
    description: "Discover modern orthopedic treatment and care.",
    date: "12-Aug-2022",
    author: "John Smith",
    introduction:
      "Orthopedic treatment focuses on conditions involving bones, joints, muscles, ligaments, and tendons.",
    heading: "Types of Orthopedic Care",
    paragraphs: [
      "Treatment options vary depending on the condition and may include physical therapy, medication, lifestyle adjustments, or surgical procedures.",
      "An orthopedic specialist evaluates each patient's condition to determine an appropriate treatment approach.",
    ],
    quote:
      "Every orthopedic treatment plan should consider the patient's individual condition and needs.",
    closing:
      "Early consultation with a healthcare professional can help patients understand their treatment options.",
  },
  {
    id: "article-3",
    image: "/Resource3.jpg",
    title: "Patient Recovery",
    description: "Understanding the recovery process after treatment.",
    date: "12-Aug-2022",
    author: "John Smith",
    comments: 6,
    introduction:
      "Recovery is an important part of a patient's healthcare journey, especially after orthopedic treatment or surgery.",
    heading: "Understanding the Recovery Process",
    paragraphs: [
      "The recovery process can differ from one patient to another depending on the procedure, overall health, and medical recommendations.",
      "Follow-up appointments and rehabilitation guidance help healthcare professionals monitor a patient's progress.",
    ],
    quote:
      "A recovery plan should be guided by healthcare professionals and adapted to each patient's needs.",
    closing:
      "Patients should follow the instructions provided by their healthcare team throughout the recovery process.",
  },
  {
    id: "article-4",
    image: "/Resource4.jpg",
    title: "Advanced Healthcare",
    description: "Explore advanced technology in healthcare.",
    date: "12-Aug-2022",
    author: "John Smith",
    comments: 4,
    introduction:
      "Advanced healthcare brings together medical knowledge, technology, and healthcare services to support patient care.",
    heading: "Technology in Modern Healthcare",
    paragraphs: [
      "Digital systems and modern medical equipment can support healthcare professionals in managing information and delivering services.",
      "Technology continues to develop and provides new opportunities for improving healthcare processes and patient experiences.",
    ],
    quote:
      "Healthcare innovation is most valuable when it supports safe, effective, and patient-centered care.",
    closing:
      "The development of healthcare technology continues to create opportunities for better healthcare services.",
  },
];

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = articles.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-5 py-10">
      <article className="mx-auto max-w-4xl bg-white px-6 py-8 shadow-sm md:px-12 md:py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/resource" className="hover:text-blue-600">
            Resource
          </Link>
          <span>&gt;</span>
          <span className="text-blue-600">Article</span>
        </div>

        {/* Article Title */}
        <h1 className="mb-4 text-2xl font-semibold leading-tight tracking-wide text-gray-900 md:text-3xl">
          {article.title}
        </h1>
        {/* Main Image */}
        <div className="mb-6">
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={650}
            className="aspect-video w-full object-cover"
            priority
          />
        </div>

        {/* Author */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <UserRound size={20} />
          </div>

          <div className="text-xs">
            <p className="font-medium text-gray-800">{article.author}</p>
            <p className="text-gray-400">Author</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="space-y-6 text-sm leading-7 text-gray-600">
          <p>{article.introduction}</p>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              {article.heading}
            </h2>

            {article.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Quote */}
          <blockquote className="border-l-2 border-gray-300 py-2 pl-7 text-sm italic leading-7 text-gray-600">
            "{article.quote}"
          </blockquote>

          <p>{article.closing}</p>
        </div>
        {/* Comment Section */}
        <CommentSection />
        {/* Back Button */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <Link
            href="/resource"
            className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft size={16} />
            Back to Resources
          </Link>
        </div>
      </article>
    </main>
  );
}
