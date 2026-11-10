import { staticArticles } from "@/lib/newsData";
import BeritaKampusClient from "@/components/BeritaKampusClient";



export default function ProfilBeritaContent() {
  return (
    <div>

        <BeritaKampusClient initialArticles={staticArticles} />
      
    </div>
  );
}
