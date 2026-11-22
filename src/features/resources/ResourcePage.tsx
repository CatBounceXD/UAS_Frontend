import ArticleCard from "@/features/resources/components/ArticleCard";
import ResourceCard from "@/features/resources/components/ResourceCard";
import { articles, photos } from "@/features/resources/data/resource-data";

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
              <ResourceCard key={photo.title} {...photo} />
            ))}
          </div>
        </div>
      </section>

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