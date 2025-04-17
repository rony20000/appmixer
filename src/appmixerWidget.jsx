import { useEffect } from "react";

export default function AppmixerWidget() {
  useEffect(() => {
    const appmixer = new window.Appmixer({
      baseUrl: "https://api.unique-marmot-10470.appmixer.cloud",
    });

    const username = process.env.REACT_APP_APPMIXER_USERNAME;
    const password = process.env.REACT_APP_APPMIXER_PASSWORD;

    appmixer.api
      .authenticateUser(username, password)
      .then((auth) => {
        appmixer.set("accessToken", auth.token);

        const flowManager = appmixer.ui.FlowManager({
          el: "#flow-manager-placeholder",
          options: {
            menu: [{ event: "flow:remove", label: "Remove" }],
          },
        });

        const designer = appmixer.ui.Designer({
          el: "#designer-placeholder",
          options: {
            showButtonHome: true,
            menu: [{ event: "flow:rename", label: "Rename" }],
            toolbar: [
              ["undo", "redo"],
              ["zoom-to-fit", "zoom-in", "zoom-out"],
              ["logs"],
            ],
          },
        });

        flowManager.on("flow:open", (flowId) => {
          designer.close();
          designer.set("flowId", flowId);
          designer.open();
        });

        designer.on("navigate:flows", () => {
          designer.close();
          flowManager.reload();
        });

        flowManager.open();
      })
      .catch((err) => {
        console.error("Authentication failed:", err);
      });
  }, []);

  return (
    <>
      <div id="flow-manager-placeholder" style={{ height: "300px" }} />
      <div id="designer-placeholder" style={{ height: "600px" }} />
    </>
  );
}
