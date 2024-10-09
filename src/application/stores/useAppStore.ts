import { create } from "zustand";
import { PodcastService } from "../services/PodcastService";
import { PodcastRepository } from "../../infraestructure/repositories/PodcastRepository";

interface AppStorage {
  podcastService: PodcastService;
  isLoading: boolean;
  updateLoading: (newLoading: boolean) => void;
}

export const useAppStore = create<AppStorage>((set) => ({
  podcastService: new PodcastService(new PodcastRepository()),
  isLoading: false,
  updateLoading: (newLoading: boolean) => set({ isLoading: newLoading }),
}));
