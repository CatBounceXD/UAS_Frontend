
import ArticleCard from "@/components/ArticleCard";
import ResourceCard from "@/components/ResourceCard";

const photos = [
  {
    id: "resource-1",
    image: "/Resource1.png",
    title: "Medical Team",
    description: "Meet our professional medical team.",
  },
  {
    id: "resource-2",
    image: "/Resource2.png",
    title: "Hospital Facilities",
    description: "Explore our modern hospital facilities.",
  },
  {
    id: "resource-3",
    image: "/Resource3.jpg",
    title: "Patient Care",
    description: "Providing quality care for every patient.",
  },
  {
    id: "resource-4",
    image: "/Resource4.jpg",
    title: "Medical Services",
    description: "Discover our healthcare services.",
  },
  {
    id: "resource-5",
    image: "/Resource1.png",
    title: "Healthcare Professionals",
    description: "Our team is dedicated to your health.",
  },
  {
    id: "resource-6",
    image: "/Resource2.png",
    title: "Modern Environment",
    description: "A comfortable environment for patients.",
  },
  {
    id: "resource-7",
    image: "/Resource3.jpg",
    title: "Quality Treatment",
    description: "Supporting your health and recovery.",
  },
  {
    id: "resource-8",
    image: "/Resource4.jpg",
    title: "Orthopedic Care",
    description: "Specialized care for bone and joint health.",
  },
];

const articles = [
  {
    id: "article-1",
    image: "/Resource1.png",
    title: "Adult Reconstruction",
    description: "Learn more about Striker's Mako Total Hip replacement.",
    date: "12-Aug-2022",
    author: "John Smith",
  },
  {
    id: "article-2",
    image: "/Resource2.png",
    title: "Orthopedic Treatment",
    description: "Discover modern orthopedic treatment and care.",
    date: "12-Aug-2022",
    author: "John Smith",
  },
  {
    id: "article-3",
    image: "/Resource3.jpg",
    title: "Patient Recovery",
    description: "Understanding the recovery process after treatment.",
    date: "12-Aug-2022",
    author: "John Smith",
  },
  {
    id: "article-4",
    image: "/Resource4.jpg",
    title: "Advanced Healthcare",
    description: "Explore advanced technology in healthcare.",
    date: "12-Aug-2022",
    author: "John Smith",
  },
];

export default function ResourcePage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold text-blue-900">
            Gallery
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo) => (
              <ResourceCard key={photo.id} {...photo} />
            ))}
          </div>
        </div>
      
      </section>

      {/* Articles Section */}
      <section className="mx-auto mt-4 max-w-7xl px-6 pb-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold text-blue-900">
            Articles
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
