import { redirect } from "next/navigation"

export default function Home() {
  redirect("/landingpage")
}

export const dynamic='force-dynamic';
//export const revalidate = 5;
