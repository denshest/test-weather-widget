import {ActionContext} from "vuex";
import {State} from "@/store/types";
import {Mutations} from "@/store/mutations/types";
import City from "@/models/City";

export enum ActionType {
    ADD_CITY = 'ADD_CITY',
    DELETE_CITY = 'DELETE_CITY'
}

type ActionArguments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}
export type Actions = {
    [ActionType.ADD_CITY](context: ActionArguments, payload: City): void;
    [ActionType.DELETE_CITY](context: ActionArguments, payload: number): void;
}