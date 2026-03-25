import { Box } from "@fried-ui/react/box";

export default function Home() {
  return (
    <Box className="flex min-h-screen items-center justify-center">
      <Box className="text-center">
        <h1 className="text-4xl font-bold">fried-ui</h1>
        <p className="mt-2 text-lg text-gray-500">Component library</p>
      </Box>
    </Box>
  );
}
