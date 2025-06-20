import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Recipe Book</h1>
      <p>
        Go to <Link href="/recipes">Recipes List</Link>
      </p>
    </div>
  );
}
