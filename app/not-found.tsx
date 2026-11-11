import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page" style={{ paddingTop: 48 }}>
      <h1 className="t-title">We couldn&rsquo;t find that page</h1>
      <p className="muted">It may have moved. Try searching for a setting above, or head back home.</p>
      <Link href="/" className="btn btn--accent">Go to Home</Link>
    </div>
  );
}
