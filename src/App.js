import SessionTimeline from "./components/SessionTimeline";
import { sampleData } from "./data/sampleData";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SessionTimeline sessionData={sampleData} />
    </div>
  );
}

export default App;
