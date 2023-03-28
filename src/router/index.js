import { createRouter, createWebHistory } from 'vue-router'
import { setAccessToken } from '../accessToken'
import Home from '../visitor/Home.vue'
import SignIn from '../visitor/SignIn.vue'
import SignUp from '../visitor/SignUp.vue'
import Cart from '../visitor/Cart.vue'
import Account from '../visitor/Account.vue'
import AccountSignIn from '../visitor/AccountSignIn.vue'
import ManageStore from '../visitor/ManageStore.vue'
import CreateStore from '../visitor/CreateStore.vue'
import StoreItems from '../visitor/StoreItems.vue'
import EditItem from '../visitor/EditItem.vue'
import Profits from '../visitor/Profits.vue'
import NotFound from '../visitor/NotFound.vue'
import StoreSetting from '../visitor/StoreSetting.vue'
import StoreName from '../visitor/store-settings/StoreName.vue'
import AccountPlan from '../visitor/store-settings/AccountPlan.vue'
import AccountFulfillment from '../visitor/store-settings/AccountFulfillment.vue'
import AccountCategory from '../visitor/store-settings/AccountCategory.vue'
import BankAccount from '../visitor/store-settings/BankAccount.vue'
import SuspendStore from '../visitor/store-settings/SuspendStore.vue'
import Category from '../visitor/Category.vue'
import Description from '../visitor/ProductDescription.vue'
import Buy from '../visitor/Buy.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Create from '../views/Create.vue'
import Control from '../views/Control.vue'
import Update from '../views/Update.vue'
import Master from '../views/Master.vue'
import Post from '../views/Post.vue'
import PostEdit from '../views/PostEdit.vue'
import AllNotification from '../views/AllNotification.vue'
import ClientDetails from '../views/ClientDetails.vue'
import ClientStore from '../visitor/ClientStore.vue'
import API from '../axios'

async function authUser(to, from, next) {
  await API.getUser()
  .then((res) => {
    const { ok } = res
    if (ok == true) {
      next({ name: "Cart" })
    } else {
      next()
    }
  })
}

async function authStore(to, from, next) {
  await API.getUserStore()
  .then((res) => {
    const { ok, suspended } = res
    if (ok == false) {
      next({ name: 'AccountSignIn' })
    } else if (!suspended && ok) {
      next()
    } else if(suspended && ok) {
      next({ name: "Account" })
    }
  })
}

async function getAuthStore(to, from, next) {
  await API.getUserStore()
  .then((res) => {
    const { ok, suspended } = res
    if (ok == false) {
      next({ name: 'AccountSignIn' })
    } else if (suspended && ok) {
      next()
    } else {
      next()
    }
  })
}

async function authAdmin(to, from, next) {
  await fetch('/panel/authAdmin', {
    method: 'GET',
    credentials: "include"
  })
  .then(async (res) => {
    const { ok } = await res.json()
    if(ok === true) {
      next()
    } else {
      next({ name: 'Home' })
    }
  })
}

const routes = [
  // {
  //   path: '/',
  //   name: 'Index',
  //   component: Index
  // },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:storename',
    name: 'ClientStore',
    component: ClientStore
  },
  {
    path: '/sign',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: [authUser]
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: [getAuthStore],
    props: true
  },
  {
    path: '/sign/account',
    name: 'AccountSignIn',
    component: AccountSignIn,
    beforeEnter: [authUser]
  },
  {
    path: '/account/manage',
    name: 'ManageAccount',
    component: ManageStore,
    beforeEnter: [authStore]
  },
  {
    path: '/account/create',
    name: 'CreateStore',
    component: CreateStore,
    beforeEnter: [authStore]
  },
  {
    path: '/account/item',
    name: 'StoreItems',
    component: StoreItems,
    beforeEnter: [authStore]
  },
  {
    path: '/account/item/:id',
    name: 'EditItem',
    component: EditItem,
    beforeEnter: [authStore]
  },
  {
    path: '/account/store',
    name: 'StoreSetting',
    component: StoreSetting,
    beforeEnter: [authStore]
  },
  {
    path: '/account/store/name',
    name: 'StoreName',
    component: StoreName,
    beforeEnter: [authStore]
  },
  {
    path: '/account/store/plan',
    name: 'AccountPlan',
    component: AccountPlan,
    beforeEnter: [authStore]
  },
  {
    path: '/account/store/fulfillment',
    name: 'AccountFulfillment',
    component: AccountFulfillment,
    beforeEnter: [authStore]
  },
  {
    path: '/account/store/category',
    name: 'AccountCategory',
    component: AccountCategory,
    beforeEnter: [authStore]
  },
  {
    path: '/account/store/bank',
    name: 'BankAccount',
    component: BankAccount,
    beforeEnter: [authStore]
  },
  {
    path: '/account/store/suspend',
    name: 'SuspendStore',
    component: SuspendStore,
    beforeEnter: [authStore]
  },
  {
    path: '/account/profits',
    name: 'Profits',
    component: Profits,
    beforeEnter: [authStore]
  },
  {
    path: '/products/:tool/:contentid',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/items/:id',
    name: 'ProductDescription',
    component: Description,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    props: true
  },
  {
    path: '/buy',
    name: 'Buy',
    component: Buy,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.name == 'Buy') {
        fetch("/material/refresh_token", {
          method: "POST",
          credentials: "include"
        }).then(async (res) => {
          const { accessToken } = await res.json();
          if(accessToken === "") {
            next({ name: 'Cart' })
          } else {
            setAccessToken(accessToken);
            next();
          }
        })
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/testxyz',
    name: 'Login',
    component: Login
  },
  {
    path: '/testxyz/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/testxyz/control/:id',
    name: 'Control',
    component: Control,
    props: true
  },
  {
    path: '/testxyz/home/:id',
    name: 'Master',
    component: Master,
    props: true
  },
  {
    path: '/testxyz/update/:id',
    name: 'Update',
    component: Update,
    props: true
  },
  {
    path: '/testxyz/post/:id',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/testxyz/postedit/:id/:contentid',
    name: 'PostEdit',
    component: PostEdit,
    props: true
  },
  {
    path: '/testxyz/notification',
    name: 'AllNotification',
    component: AllNotification,
    props: true,
    beforeEnter: [authAdmin]
  },
  {
    path: '/testxyz/client/:email',
    name: 'ClientDetails',
    component: ClientDetails,
    props: true,
    beforeEnter: [authAdmin]
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  //redirect
  {
    path: '/testxyz/login',
    redirect: '/testxyz'
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
