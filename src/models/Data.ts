import Coordinates from "@/models/Coordinates";
import Weather from "@/models/Weather";
import Wind from "@/models/Wind";
import Clouds from "@/models/Clouds";
import Rain from "@/models/Rain";
import Snow from "@/models/Snow";
import System from "@/models/System";

export default interface Data {
    id: number;
    name: string;
    timezone: number;
    cod: number;
    dt: number;
    base: string;
    coord: Coordinates;
    sys: System;
    weather: Array<Weather>;
    wind?: Wind;
    clouds?: Clouds;
    rain?: Rain;
    snow?: Snow;
}