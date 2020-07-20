import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/*Layout*/
// import Layout from "@/layout"

/*Router Modules */


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path:"/login",
        component:()=>import("@/views/login/index"),
        // hidden:true
    }
]

const router = new Router({
    routes:constantRoutes
})
export default router