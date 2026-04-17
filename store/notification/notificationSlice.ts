import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationsState {
  items: string[];
}

const initialState: NotificationsState = { items: [] };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<string>) {
      state.items.push(action.payload);
    },
    clearNotifications(state) {
      state.items = [];
    },
  },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
