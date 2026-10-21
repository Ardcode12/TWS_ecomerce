import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { state } = useStore();
  const { toast } = state;
  return (
    <div className={`toast ${toast ? "show " + toast.type : ""}`}>
      {toast?.type === "success" && "✓ "}
      {toast?.type === "error" && "✕ "}
      {toast?.message}
    </div>
  );
}
