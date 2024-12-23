import { observer } from "mobx-react-lite";
import { css } from "glamor";
import { Lightbulb } from "lucide-react";
import { store } from "../../stores";

const styles = {
  section: css({
    backgroundColor: "#333",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  }),
  sectionTitle: css({
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
    borderBottom: "1px solid #444",
    paddingBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  controlGroup: css({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }),
  switch: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#aaa",
    padding: "8px",
    backgroundColor: "#2a2a2a",
    borderRadius: "4px",
    ":hover": {
      backgroundColor: "#3a3a3a",
    },
  }),
  toggle: css({
    position: "relative",
    width: "44px",
    height: "24px",
    backgroundColor: "#666",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  }),
  toggleActive: css({
    backgroundColor: "#34D399",
  }),
  toggleHandle: css({
    position: "absolute",
    top: "2px",
    left: "2px",
    width: "20px",
    height: "20px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    transition: "transform 0.2s",
  }),
};

export const LightingControls = observer(() => {
  return (
    <div {...styles.section}>
      <h3 {...styles.sectionTitle}>
        <Lightbulb size={16} />
        Aircraft Lights
      </h3>

      <div {...styles.controlGroup}>
        <div {...styles.switch}>
          <span>Navigation Lights</span>
          <div
            {...css(
              styles.toggle,
              store.lights.navLights && styles.toggleActive
            )}
            onClick={() => store.lights.toggleNavLights()}
          >
            <div
              {...styles.toggleHandle}
              style={{
                transform: store.lights.navLights
                  ? "translateX(20px)"
                  : "translateX(0)",
              }}
            />
          </div>
        </div>

        <div {...styles.switch}>
          <span>Beacon</span>
          <div
            {...css(styles.toggle, store.lights.beacon && styles.toggleActive)}
            onClick={() => store.lights.toggleBeacon()}
          >
            <div
              {...styles.toggleHandle}
              style={{
                transform: store.lights.beacon
                  ? "translateX(20px)"
                  : "translateX(0)",
              }}
            />
          </div>
        </div>

        <div {...styles.switch}>
          <span>Landing Light</span>
          <div
            {...css(
              styles.toggle,
              store.lights.landingLight && styles.toggleActive
            )}
            onClick={() => store.lights.toggleLandingLight()}
          >
            <div
              {...styles.toggleHandle}
              style={{
                transform: store.lights.landingLight
                  ? "translateX(20px)"
                  : "translateX(0)",
              }}
            />
          </div>
        </div>

        <div {...styles.switch}>
          <span>Strobe Lights</span>
          <div
            {...css(
              styles.toggle,
              store.lights.strobeLights && styles.toggleActive
            )}
            onClick={() => store.lights.toggleStrobeLights()}
          >
            <div
              {...styles.toggleHandle}
              style={{
                transform: store.lights.strobeLights
                  ? "translateX(20px)"
                  : "translateX(0)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
