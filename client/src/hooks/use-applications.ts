import { useMutation } from "@tanstack/react-query";
import { api, type InsertApplication } from "@shared/routes";

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
        if (res.status === 400) {
          const error = api.applications.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit application");
      }
      
      return api.applications.create.responses[201].parse(await res.json());
    },
  });
}
