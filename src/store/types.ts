import City from "@/models/City";

export type State = {
    cities: City[];
};

export const state: State = {
    cities: []
};