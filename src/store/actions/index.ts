import {state, State} from "@/store/types";
import City from "@/models/City";
import {ActionTree} from "vuex";
import {Actions, ActionType} from "@/store/actions/types";
import {MutationType} from "@/store/mutations/types";

export const actions:  ActionTree<State, State> & Actions = {
    [ActionType.ADD_CITY]({ commit }, payload: {city: City; isCurrentCity: boolean}) {
        if (!state.cities.some((city: City) => city.id === payload.city.id)) {
            if (payload.isCurrentCity) {
                commit(MutationType.FOUND_CURRENT_CITY)
            }
            commit(MutationType.ADD_CITY, payload.city)
            commit(MutationType.UPDATE_STORAGE)
        }
    },
    [ActionType.DELETE_CITY]({ commit }, payload: number) {
        commit(MutationType.DELETE_CITY, payload)
        commit(MutationType.UPDATE_STORAGE)
    }
}