import Link from "next/link";

function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-heading">fried-ui</h1>
        <p className="mt-2 text-lg text-muted-foreground">Beautiful, accessible React components</p>

        <Link
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          href="/docs"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
}

export default Home;
