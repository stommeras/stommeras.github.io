import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <h1>Tommeras</h1>
      <p>One of the websites of all time.</p>
    </div>
  );
}
