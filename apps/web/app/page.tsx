import { SimCanvas } from '../features/sim/SimCanvas';
import { SimControls } from '../features/sim/SimControls';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 min-h-screen p-4">
      <SimCanvas />
      <SimControls />
    </main>
  );
}
