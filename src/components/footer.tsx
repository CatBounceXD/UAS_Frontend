import { MapPin, Phone, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full w-max-full">
      <section className="w-full justify-end">
        <p>
          "We are here to provide you the best care for your health problems!"
        </p>
        <h3>Contact Us</h3>
        <div>
          <Printer />
          <p>081234567890</p>
          <Phone />
          <p>081234567890</p>
        </div>
      </section>
      <section>
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Our Team</Link>
          </li>
          <li>
            <Link href="/">Patients</Link>
          </li>
          <li>
            <Link href="/">Education</Link>
          </li>
          <li>
            <Link href="/">Contact Us</Link>
          </li>
        </ul>
      </section>
      <section>
        <h3>Folow Us</h3>
        <div>
          <Link href="https://facebook.com/" target="_blank">
            <Image src="Facebook.svg" alt="Facebook" width={24} height={24} />
          </Link>
          <Link href="https://instagram.com/" target="_blank">
            <Image src="Instagram.svg" alt="Instagram" width={24} height={24} />
          </Link>
        </div>
        <h3>Locations</h3>
        <MapPin />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
          exercitationem veritatis velit, repellendus at fuga nobis quasi
          officiis atque dolor rerum distinctio beatae error vel est reiciendis
          ex nulla accusantium.
        </p>
      </section>
      <section></section>
    </footer>
  );
}

export default Footer;
