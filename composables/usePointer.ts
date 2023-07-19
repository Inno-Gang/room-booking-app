import { useMounted, useStyleTag } from "@vueuse/core";

export type Cursor = "grabbing";

export default function useCursor(cursor: Ref<Cursor | null>) {
  useStyleTag(`body._cursor, body._cursor * { cursor: grabbing !important }`);
  const isMounted = useMounted();
  watch([isMounted, cursor], ([newIsMounted, newCursor]) => {
    if (newIsMounted) {
      if (newCursor === "grabbing") {
        document.body.classList.add("_cursor");
      } else {
        document.body.classList.remove("_cursor");
      }
    }
  });
}
