import { css } from "glamor";
import { Plane3D } from "./components/Plane3D/Plane3D";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { EngineControls } from "./components/ControlPanel/EngineControls";
import { StartupChecklist } from "./components/StartupChecklist/StartupChecklist";
import { ControlFeedback } from "./components/ControlFeedback/ControlFeedback";
import { Drawer } from "./components/common/Drawer";
import { useControlSounds } from "./hooks/useControlSounds";

const styles = {
  container: css({
    display: "flex",
    backgroundColor: "#1a1a1a",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
  }),
  title: css({
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    zIndex: 100,
  }),
  mainContent: css({
    flex: 1,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};

function App() {
  useControlSounds();

  return (
    <div {...styles.container}>
      <h1 {...styles.title}>Cessna 172 Control Panel</h1>

      <Drawer side="left" title="Startup Checklist" defaultOpen={false}>
        <StartupChecklist />
      </Drawer>

      <div {...styles.mainContent}>
        <Plane3D />
      </div>

      <ControlFeedback />

      <Drawer side="right" title="Controls" defaultOpen={false}>
        <EngineControls />
        <ControlPanel />
      </Drawer>
    </div>
  );
}

export default App;
