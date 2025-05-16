import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    order : []
}

const orderSlice = createSlice({
    name : 'order',
    initialState : initialValue,
    reducers : {
        setOrder : (state,action)=>{
            state.order = [...action.payload]
        },
        clearOrders: (state) => {
      state.order = [];
    }
}
})

export const {setOrder,clearOrders  } = orderSlice.actions

export default orderSlice.reducer