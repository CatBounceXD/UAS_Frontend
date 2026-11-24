import { MapPin, Phone, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold">
              E
            </span>
            <span>
              E-Health <span className="text-primary">Center</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            &ldquo;Kami hadir untuk memberikan layanan kesehatan terbaik dan
            terpercaya bagi kebutuhan medis Anda.&rdquo;
          </p>

          <div className="pt-2 space-y-2.5">
            <h3 className="font-semibold text-slate-800 text-base">
              Hubungi Kami
            </h3>
            <div className="flex items-center gap-2.5 text-sm">
              <Printer className="h-4 w-4 text-primary shrink-0" />
              <span>(021) 561-1355</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>0812-3456-7890</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 text-base">
              Tautan Cepat
            </h3>
            <div className="h-0.5 w-8 bg-primary mt-1.5 rounded-full" />
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/doctors"
                className="hover:text-primary transition-colors"
              >
                Daftar Dokter
              </Link>
            </li>
            <li>
              <Link
                href="/appointments"
                className="hover:text-primary transition-colors"
              >
                Janji Temu
              </Link>
            </li>
            <li>
              <Link
                href="/education"
                className="hover:text-primary transition-colors"
              >
                Edukasi Kesehatan
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Kontak Kami
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-slate-800 text-base">
                Ikuti Kami
              </h3>
              <div className="h-0.5 w-8 bg-primary mt-1.5 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Image
                  src="/Facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
              >
                <Image
                  src="/Instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-slate-800 text-base">
                Lokasi Klinik
              </h3>
              <div className="h-0.5 w-8 bg-primary mt-1.5 rounded-full" />
            </div>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
              <p className="leading-relaxed">
                Jl. Letjen S. Parman No. 1, Grogol Petamburan, Jakarta Barat
                11440
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} E-Health Center. Hak cipta
            dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-primary">
              Syarat &amp; Ketentuan
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-primary">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
