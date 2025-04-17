import { useState } from "react";
import SupportForm from "./supportForm";
import AppmixerDesigner from "./appmixerWidget";

function App() {
  const [showDesigner, setShowDesigner] = useState(false);

  return (
    <div className="App">
      {showDesigner ? (
        <AppmixerDesigner />
      ) : (
        <SupportForm onMockAdminAccess={() => setShowDesigner(true)} />
      )}
    </div>
  );
}

export default App;
