import Link from "next/link";

const Home = (): React.JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-heading">fried-ui</h1>

        <p className="mt-2 text-lg font-bold text-foreground">
          Same component in React. Same class in HTML. One source of truth.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Compound primitives, dual selectors, dark mode, and zero runtime.
        </p>

        <Link
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          href="/docs"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
};

export default Home;
