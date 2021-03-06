import store from "../index"


export const GET_SEARCH = "GET_SEARCH"
export const RECEIVE_SEARCH = "RECEIVE_SEARCH"
export const FAIL_SEARCH = "FAIL_SEARCH"

const fetchingSearch = () => ({
    type: GET_SEARCH,
})

const fetchedSearch = (payload) => ({
    type: RECEIVE_SEARCH,
    payload,
})

const failedSearch = (payload) => ({
    type: FAIL_SEARCH,
    payload,
})

export const executeSearch = async(name, ingredients) => {
    const response = await fetch("/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, ingredients }),
    })
    const searchResults = await response.json()
    return searchResults
}

// TODO: fix action
export const searchRecipes = (name, ingredients) => {
    store.dispatch(fetchingSearch())
    executeSearch(name, ingredients)
        .then((res) => {
            store.dispatch(fetchedSearch(res))
        })
        .catch((err) => store.dispatch(failedSearch(err)))

}