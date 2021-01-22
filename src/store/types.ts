import City from "@/models/City";

export type State = {
    cities: City[];
    isCurrentCityFound: boolean;
};

export const state: State = {
    cities: [],
    isCurrentCityFound: false
};