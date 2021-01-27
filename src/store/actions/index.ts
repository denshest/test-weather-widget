import {state, State} from "@/store/types";
import City from "@/models/City";
import {ActionTree} from "vuex";
import {Actions, ActionType} from "@/store/actions/types";
import {MutationType} from "@/store/mutations/types";
import Data from "@/models/Data";

export const actions:  ActionTree<State, State> & Actions = {
    [ActionType.ADD_CITY]({ commit }, payload: string): Promise<Data | void> {
        return fetch(payload)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Data>
            })
            .then(data => {
                if (!state.cities.some((city: City) => city.id === data.id)) {
                    commit(MutationType.ADD_CITY, {
                        id: data.id,
                        name: data.name,
                        country: data.sys.country
                    })
                    commit(MutationType.UPDATE_STORAGE)
                }
            })
    },
    [ActionType.DELETE_CITY]({ commit }, payload: number) {
        commit(MutationType.DELETE_CITY, payload)
        commit(MutationType.UPDATE_STORAGE)
    },
    [ActionType.UPDATE_CITIES]({ commit }, payload: City[]) {
        commit(MutationType.UPDATE_CITIES, payload)
        commit(MutationType.UPDATE_STORAGE)
    }
}