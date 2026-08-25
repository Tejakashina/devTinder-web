import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
    name: 'connections',
    initialState: null,
    reducers: {
        addConnection: (state, action) => action.payload,
        removeConnection:(state,action)=>null
    }
})
export const {addConnection,removeConnection} = connections.actions
export default connections.reducer