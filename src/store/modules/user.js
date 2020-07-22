import { login} from '@/api/user'
const state = {
    
}

const mutations = {

}

const actions = {
    //user login
    login({commit},userInfo){
        const {username,password} = userInfo
        return new Promise((resolve,reject)=>{
        })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}