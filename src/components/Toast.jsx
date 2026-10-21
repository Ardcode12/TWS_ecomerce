import { useStore } from "../context/StoreContext";
import { Check, Close } from "./Icons";

export default function Toast() {
  const { state } = useStore();
  const { toast } = state;
  return (
    <div className={`toast ${toast ? "show " + toast.type : ""}`} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {toast?.type === "success" && <Check size={16} />}
      {toast?.type === "error" && <Close size={16} />}
      <span>{toast?.message}</span>
    </div>
  );
}
