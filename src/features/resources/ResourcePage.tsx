import ArticleCard from "@/features/resources/components/ArticleCard";
import ResourceCard from "@/features/resources/components/ResourceCard";
import { getAllArticles, getAllResources } from "@/features/resources/queries";

export default async function ResourcePage() {
  const [photos, articles] = await Promise.all([
    getAllResources(),
    getAllArticles(),
  ]);

  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold text-blue-900">
            Gallery
          </h1>

          {photos.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada data galeri.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {photos.map((photo) => (
                <ResourceCard
                  key={photo.id}
                  image={photo.imageUrl}
                  title={photo.title}
                  description={photo.description}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-7xl px-6 pb-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold text-blue-900">
            Articles
          </h2>

          {articles.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada artikel tersedia.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  slug={article.slug}
                  image={article.imageUrl}
                  title={article.title}
                  description={article.description}
                  date={new Date(article.publishedAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                  author={article.authorName}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
