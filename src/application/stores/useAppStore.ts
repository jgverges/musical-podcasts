import { create } from "zustand";
import { IPodcastRepository } from "../../domain/interfaces/IPodcastRepository";
import { PodcastService } from "../services/PodcastService";
import { PodcastRepository } from "../../infraestructure/repositories/PodcastRepository";

interface AppStore {
  isLoading: boolean;
  searchTerm: string;
  podcastService: IPodcastRepository;

  setSearchTerm: (newSearchTerm: string) => void;
  updateLoading: (newLoading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  searchTerm: "",
  podcastService: new PodcastService(new PodcastRepository()),

  updateLoading: (newLoading: boolean) =>
    set(() => ({
      isLoading: newLoading,
    })),
  setSearchTerm: (newSearchTerm: string) =>
    set(() => ({
      searchTerm: newSearchTerm,
    })),
}));
