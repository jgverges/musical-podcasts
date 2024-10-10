import { create } from "zustand";
import { IPodcastRepository } from "../../domain/interfaces/IPodcastRepository";
import { PodcastService } from "../services/PodcastService";
import { PodcastRepository } from "../../infraestructure/repositories/PodcastRepository";

interface AppStore {
  isLoading: boolean;
  podcastService: IPodcastRepository;
  updateLoading: (newLoading: boolean) => void;
}
export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  podcastService: new PodcastService(new PodcastRepository()),
  updateLoading: (newLoading: boolean) =>
    set(() => ({
      isLoading: newLoading,
    })),
}));
