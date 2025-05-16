import AppDataSource from "./AppDataSource";

let initialized = false;

export const initializeDataSource = async () => {
  if (!initialized) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    initialized = true;
  }
  return AppDataSource;
};
