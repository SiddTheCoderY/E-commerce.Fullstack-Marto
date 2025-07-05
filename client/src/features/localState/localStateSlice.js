import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSideBarCollapsed: false,
    // product search filter state
    searchFilter: {
        searchQuery: "",
        category: "",
        price: "",
        rating: "",
        brand: "",
        sortBy: "",
        page: 1,
        itemsPerPage: 10,
        isFilterApplied: false,
        isLoading: false,
        error: null
    },
}

const localStateSlice = createSlice({
    name : 'localState',
    initialState,
    reducers : {
        setIsSideBarCollapsed : (state,action) => {
            state.isSideBarCollapsed = action.payload
        },
        setSearchFilter: (state, action) => {
            state.searchFilter = {
                ...state.searchFilter,
                ...action.payload
            }
        },
        resetSearchFilter: (state) => {
            state.searchFilter = {
                searchQuery: "",
                category: "",
                price: "",
                rating: "",
                brand: "",
                sortBy: "",
                page: 1,
                itemsPerPage: 10,
                isFilterApplied: false,
                isLoading: false,
                error: null
            }
        },

    }
    
})

export const {setIsSideBarCollapsed,setSearchFilter,resetSearchFilter} = localStateSlice.actions

export default localStateSlice.reducer