import {create } from 'zustand';

interface SidebarState {
  collapsed: boolean,
  onCollapse: () => void,
  onExpand: () => void,
}

export const useSidebar = create<SidebarState>((set) => ({
    collapsed: false,
    onCollapse: () => set(() =>({ collapsed: true })),
    onExpand: () => set(() => ({ collapsed: false })),
}));