import { Box } from "@fried-ui/react/box";

function Home(): React.JSX.Element {
  return (
    <Box className="flex min-h-screen items-center justify-center">
      <Box className="text-center">
        <h1 className="text-4xl font-bold">fried-ui docs</h1>
        <p className="mt-2 text-lg text-gray-500">Documentation</p>
      </Box>
    </Box>
  );
}

export default Home;
