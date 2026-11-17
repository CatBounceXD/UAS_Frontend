import { db } from "@/db";
import { dokter } from "@/db/schema";

export default async function HalamanPasien() {
  // Ambil data dari database
  const daftarDokter = await db.select().from(dokter);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Dokter (Test Database)</h1>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Spesialis</th>
            </tr>
          </thead>
          <tbody>
            {daftarDokter.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.nama}</td>
                <td className="p-3">{p.spesialis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}