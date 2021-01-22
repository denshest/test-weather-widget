import { createStore } from 'vuex'
import {state} from "@/store/types";
import {mutations} from "@/store/mutations";
import {actions} from "@/store/actions";

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  strict: true
})
