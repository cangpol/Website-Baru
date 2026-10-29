import { redirect } from "next/navigation";

// Decoy route: Hacker/Bot scanner protection
// Rute resmi login dipindahkan ke gerbang tersamar UPITRA Core Security
export default function DecoyAdminLoginPage() {
  redirect("/");
}
