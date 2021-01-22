import {State} from "@/store/types";
import City from "@/models/City";

export enum MutationType {
    INITIALISE_STORE = 'INITIALISE_STORE',
    ADD_CITY = 'ADD_CITY',
    DELETE_CITY = 'DELETE_CITY',
    FOUND_CURRENT_CITY = 'FOUND_CURRENT_CITY',
    UPDATE_STORAGE = 'UPDATE_STORAGE'
}

export type Mutations = {
    [MutationType.INITIALISE_STORE](state: State): void;
    [MutationType.ADD_CITY](state: State, payload: City): void;
    [MutationType.DELETE_CITY](state: State, payload: number): void;
    [MutationType.FOUND_CURRENT_CITY](state: State): void;
    [MutationType.UPDATE_STORAGE](state: State): void;
}