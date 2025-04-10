const modules = import.meta.glob("./*.ts", { eager: true });

export const questionList = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const id = path.match(/(\d+)\.ts$/)?.[1] || "";
    return [id, mod.default];
  })
);
