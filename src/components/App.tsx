import { About } from './About';
import { Landing } from './Landing';

export function App() {
  return (
    <main className="flex h-[200vh] w-full flex-col items-center justify-center">
      <Landing />
      <About />
    </main>
  );
}
