import { db } from "../index";
import { articleComments, articles, resources } from "../schema";

const SEED_RESOURCES = [
  {
    imageUrl: "/Resource1.png",
    title: "Medical Team",
    description: "Meet our professional medical team.",
    category: "gallery",
  },
  {
    imageUrl: "/Resource2.png",
    title: "Hospital Facilities",
    description: "Explore our modern hospital facilities.",
    category: "gallery",
  },
  {
    imageUrl: "/Resource3.jpg",
    title: "Patient Care",
    description: "Providing quality care for every patient.",
    category: "gallery",
  },
  {
    imageUrl: "/Resource4.jpg",
    title: "Medical Services",
    description: "Discover our healthcare services.",
    category: "gallery",
  },
  {
    imageUrl: "/Resource1.png",
    title: "Healthcare Professionals",
    description: "Our team is dedicated to your health.",
    category: "gallery",
  },
  {
    imageUrl: "/Resource2.png",
    title: "Modern Environment",
    description: "A comfortable environment for patients.",
    category: "gallery",
  },
  {
    imageUrl: "/Resource3.jpg",
    title: "Quality Treatment",
    description: "Supporting your health and recovery.",
    category: "gallery",
  },
  {
    imageUrl: "/Resource4.jpg",
    title: "Orthopedic Care",
    description: "Specialized care for bone and joint health.",
    category: "gallery",
  },
];

const SEED_ARTICLES = [
  {
    slug: "article-1",
    imageUrl: "/Resource1.png",
    title: "Adult Reconstruction",
    description: "Learn more about Stryker's Mako Total Hip Replacement.",
    authorName: "John Smith",
    publishedAt: new Date("2022-08-12T08:00:00Z"),
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
    slug: "article-2",
    imageUrl: "/Resource2.png",
    title: "Orthopedic Treatment",
    description: "Discover modern orthopedic treatment and care.",
    authorName: "John Smith",
    publishedAt: new Date("2022-08-12T08:00:00Z"),
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
    slug: "article-3",
    imageUrl: "/Resource3.jpg",
    title: "Patient Recovery",
    description: "Understanding the recovery process after treatment.",
    authorName: "John Smith",
    publishedAt: new Date("2022-08-12T08:00:00Z"),
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
    slug: "article-4",
    imageUrl: "/Resource4.jpg",
    title: "Advanced Healthcare",
    description: "Explore advanced technology in healthcare.",
    authorName: "John Smith",
    publishedAt: new Date("2022-08-12T08:00:00Z"),
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

export async function seedResources() {
  console.log("Membersihkan data resources & articles lama...");
  await db.delete(articleComments);
  await db.delete(articles);
  await db.delete(resources);

  console.log("Memasukkan data resources & articles ke Neon...");
  await db.insert(resources).values(SEED_RESOURCES);
  const insertedArticles = await db
    .insert(articles)
    .values(SEED_ARTICLES)
    .returning();

  if (insertedArticles.length > 0) {
    await db.insert(articleComments).values([
      {
        articleId: insertedArticles[0].id,
        authorName: "Sarah Jenkins",
        content:
          "Artikel yang sangat informatif untuk memahami persiapan sebelum prosedur penggantian sendi.",
      },
      {
        articleId: insertedArticles[0].id,
        authorName: "Michael Tan",
        content:
          "Penjelasan mengenai teknologi Mako sangat mudah dipahami oleh pasien awam.",
      },
    ]);
  }
}
