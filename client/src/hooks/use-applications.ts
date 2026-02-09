import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertApplication } from "@shared/schema";

export function useCreateApplication() {
  return useMutation({
    mutationFn: async (data: InsertApplication) => {
      const res = await fetch(api.applications.create.path, {
        method: api.applications.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 409) {
          const error = await res.json();
          throw new Error(error.message);
        }
        if (res.status === 400) {
          const error = await res.json();
          // The Zod error structure might be different, let's just use the message if available or fallback
          throw new Error(error.message || "Invalid input");
        }
        throw new Error("Failed to submit application");
      }

      return api.applications.create.responses[201].parse(await res.json());
    },
  });
}
