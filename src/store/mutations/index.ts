import {MutationTree} from "vuex";
import {Mutations, MutationType} from "@/store/mutations/types";
import {State} from "@/store/types";
import City from "@/models/City";

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.INITIALISE_STORE](state) {
        const localCities = localStorage.getItem('cities')
        if (localCities) {
            state.cities = JSON.parse(localCities);
        }
    },
    [MutationType.ADD_CITY](state, payload: City) {
        state.cities.push(payload)
    },
    [MutationType.DELETE_CITY](state, payload: number) {
        state.cities = state.cities.filter((city: City) => city.id != payload)
    },
    [MutationType.UPDATE_CITIES](state, payload: City[]) {
        state.cities = payload
    },
    [MutationType.UPDATE_STORAGE](state) {
        localStorage.setItem('cities', JSON.stringify(state.cities))
    }
}