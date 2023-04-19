<template>
  <div v-if="!error">
    <div id="collections" class="template-list-collections">
      <div id="PageContainer" class="drawer-page-content"></div>
      <div class="quick-view"></div>
      <nav
        class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left"
        id="cbp-spmenu-s1"
      >
        <div class="gf-menu-device-wrapper">
          <div class="close-menu">x</div>
          <div class="gf-menu-device-container">
            <div class="menu-tool">
              <ul class="site-nav gf-menu" style="display: none">
                <li class="">
                  <a href="/" class>
                    <span> Home </span>
                  </a>
                </li>
                <li class="">
                  <a href="/collections" class="current">
                    <span> Collection </span>
                  </a>
                </li>
                <li class="">
                  <a href="/collections/all" class>
                    <span> Shop </span>
                  </a>
                </li>
                <li class="">
                  <a href="/pages/about" class>
                    <span> About </span>
                  </a>
                </li>
                <li class="">
                  <a href="/pages/contact-us" class>
                    <span> Contact </span>
                  </a>
                </li>
                <li class="">
                  <a href="/blogs/news" class>
                    <span> Blog </span>
                  </a>
                </li>
                <li class="">
                  <a href="/pages/faqs" class>
                    <span> Faq's </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="wrapper-container">
        <div class="header-type-3">
          <div id="shopify-section-top-bar-type-3" class="shopify-section">
          </div>
          <header class="site-header">
            <div
              id="undefined-sticky-wrapper"
              class="sticky-wrapper"
              style="height: 0px"
            >
              <div class="header-sticky">
                <div
                  id="header-landing"
                  class="sticky-animate header-animate"
                  style="top: 0px"
                >
                  <div class="container">
                    <div class="grid--full site-header__menubar">
                      <div
                        class="h1 site-header__logo order-header"
                        itemscope
                        itemtype="http://schema.org/Organization"
                      >
                        <a href="javascript:void(0)" class="fw-bolder text-capitalize mt-2 d-none d-lg-block">
                          {{ data.storename }}
                        </a>
                        <a href="javascript:void(0)" class="fw-bolder text-capitalize mt-5 d-lg-none">
                          {{ data.storename }}
                        </a>
                      </div>
                      <div class="menubar-section order-header">
                        <div class="desktop-megamenu">
                          <div
                            id="shopify-section-navigation"
                            class="shopify-section"
                          >
                          </div>
                        </div>
                      </div>
                      <div
                        id="shopify-section-header-model-3"
                        class="shopify-section"
                      >
                        <ul class="menu-icon">
                          <li class="header-search">
                            <button
                              class=""
                              aria-controls="SearchDrawer"
                              aria-expanded="false"
                              data-bs-toggle="collapse"
                              data-bs-target="#search"
                              @click="clickSearch"
                            >
                              <span
                                class="fa fa-search"
                                aria-hidden="true"
                              ></span>
                            </button>
                          </li>
                          <li class="header-bar__module cart header_cart">
                            <!-- Mini Cart Start -->
                            <div class="baskettop">
                              
                              <div class="wrapper-top-cart">
                                <router-link :to="{ name: 'Cart' }"
                                  href="javascript:void(0)"
                                  id="ToggleDown"
                                  class="icon-cart-arrow"
                                >
                                  <i class="fas fa-shopping-cart"></i>
                                  <div id="cartCount">{{ counter }}</div>
                                </router-link>
                                <div id="slidedown-cart" style="display: none">
                                  <!--  <h3>Shopping cart</h3>-->
                                  <div class="no-items">
                                    <p>Your cart is currently empty!</p>
                                    <p class="text-continue">
                                      <a class="btn" href="javascript:void(0)"
                                        >Continue shopping</a
                                      >
                                    </p>
                                  </div>
                                  <div class="has-items" style="display: none">
                                    <ul class="mini-products-list"></ul>
                                    <div class="summary">
                                      <p class="total">
                                        <span class="label">Cart total :</span>
                                        <span class="price">$0.00</span>
                                      </p>
                                    </div>
                                    <div class="actions">
                                      <button
                                        class="btn"
                                        onclick="window.location='/checkout'"
                                      >
                                        <i class="fas fa-check"></i>Check Out
                                      </button>
                                      <button
                                        class="btn text-cart"
                                        onclick="window.location='/cart'"
                                      >
                                        <i class="fas fa-shopping-basket"></i
                                        >View Cart
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End Top Header -->
                          </li>
                          <li class="menu_bar_right">
                            <div class="slidedown_section">
                              <a id="Togglemodal" class="icon-cart-arrow"
                                ><i class="fas fa-user" aria-hidden="true"></i
                              ></a>
                              <div id="slidedown-modal">
                                <div class="header-panel-top">
                                  <div class="customer_account">
                                    <ul>
                                      <li>
                                        <a href="/account/login" title="Log in">
                                          <i
                                            class="fas fa-sign-in-alt icons"
                                            aria-hidden="true"
                                          ></i>
                                          Log in</a
                                        >
                                      </li>
                                      <li>
                                        <a
                                          href="/account/register"
                                          title="Create account"
                                        >
                                          <i
                                            class="fas fa-user"
                                            aria-hidden="true"
                                          ></i>
                                          Create account</a
                                        >
                                      </li>

                                      <li>
                                        <a
                                          href="/pages/wishlist"
                                          title="Wishlist"
                                        >
                                          <i
                                            class="far fa-heart"
                                            aria-hidden="true"
                                          ></i>
                                          Wishlist</a
                                        >
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="header-mobile">
                            <div class="menu-block visible-phone">
                              <!-- start Navigation Mobile  -->
                              <div
                                id="showLeftPush"
                                class="gf-menu-device-wrapper"
                              >
                                <i class="fa fa-bars" aria-hidden="true"> </i>
                              </div>
                            </div>
                            <!-- end Navigation Mobile  -->
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <h1>All collections</h1>
      </nav>
      <div class="row justify-content-center align-items-center" style="width: 100%;">
        <div class="collapse col-lg-6 col-11" id="search">
          <form action="">
            <input type="text" class="form-control" placeholder="Search" v-model="search" id="input">
          </form>
        </div>
      </div>
      <div class="dt-sc-hr-invisible-large"></div>
      <main class="main-content">
        <div class="wrapper">
          <div class="grid-uniform">
            <div class="grid__item">
              <div class="container-bg">
                <div class="grid-uniform list-collection-products">
                  <div v-for="(datum, index) in collection" :key="index"
                    class="
                      grid__item grid__item
                      wide--one-quarter
                      post-large--one-quarter
                      large--one-quarter
                      medium--one-half
                      small--grid__item
                      text-center
                      pickgradient-products
                    "
                  >
                    <div class="text-center">
                      <a href="javascript:void(0)" title="" class="pickgradient grid-link text-decoration-none" v-if="datum.image.includes(',')">
                      <img :src="`/images/${img}`" v-for="(img, index) in datum.image.split(',')" :key="img" v-show="index === 0" class="img-fluid" style="max-height: 150px;">
                    </a>
                    </div>
                    <div class="text-center">
                      <a href="javascript:void(0)" title="" class="pickgradient grid-link text-decoration-none">
                      <img :src="`/images/${datum.image}`" v-if="!datum.image.includes(',')" class="img-fluid" style="max-height: 150px;">
                    </a>
                    </div>
                    <div class="collection-detail">
                      <a
                        href="javascript:void(0)"
                        class="grid-link"
                      >
                        <span class="grid-link__title">{{ datum.name }}</span>
                      </a>
                      <p class="collection-count">{{ datum.quantity }} <span>Item(s)</span></p>
                      <p class="collection-description">{{ datum.description }}</p>
                      <p class="text-dark">NGN {{ Number(datum.price).toLocaleString() }}</p>
                      <button class="btn btn-sm btn-warning" @click="addToCart(datum._id)" v-if="!productId.includes(datum._id)">
                        <font-awesome-icon icon="cart-arrow-down"  class="text-dark me-1"/>
                        <span class="h6 text-capitalize">Add To Cart</span>
                      </button>
                      <button class="btn btn-sm btn-danger" @click="removeFromCart(datum._id)" v-else>
                        <font-awesome-icon icon="cart-arrow-down"  class="text-dark me-1"/>
                        <span class="h6 text-capitalize">Remove From Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dt-sc-hr-invisible-large"></div>
      </main>
    </div>
    <footer id="footer" class="footer">
      <div
        data-section-id="footer-model-15"
        data-section-type="Footer-model-15"
        class="footer-model-15"
      >
        <div style="background: #77be32" class="grid__item copyright-section">
          <div
            class="
              grid__item
              wide--one-third
              post-large--one-third
              large--one-third
              medium-down--one-whole
              small--grid__item
            "
          >
            <p style="color: #ffffff" class="copyright">
              Copyright © 2022
              <a
                target="_blank"
                class="text-decoration-none"
                rel="nofollow"
                href="#"
                >Powered by Mannybay</a
              >
            </p>
          </div>

          <div
            class="
              grid__item
              wide--one-third
              post-large--one-third
              large--one-third
              medium-down--one-whole
              small--grid__item
            "
          >
            <div class="footer_social_links">
              <ul class="inline-list social-icons social-links-type-1">
                <li>
                  <a
                    style="color: #ffffff"
                    class="icon-fallback-text twitt hexagon"
                    target="blank"
                    href="https://twitter.com/mannybay"
                    onmouseover="this.style.color='#ffffff';"
                    onmouseout="this.style.color='#ffffff';"
                    title="Twitter"
                  >
                    <span class="fab fa-twitter" aria-hidden="true"></span>
                  </a>
                </li>

                <li>
                  <a
                    style="color: #ffffff"
                    class="icon-fallback-text fb hexagon text-decoration-none"
                    target="blank"
                    href="https://www.facebook.com/mannybay"
                    onmouseover="this.style.color='#ffffff';"
                    onmouseout="this.style.color='#ffffff';"
                    title="Facebook"
                  >
                    <span class="fab fa-facebook" aria-hidden="true"></span>
                    <!-- <span class="fallback-text">Facebook</span> -->
                  </a>
                </li>

                <li>
                  <a
                    style="color: #ffffff"
                    class="icon-fallback-text google hexagon text-decoration-none"
                    target="blank"
                    href="#"
                    onmouseover="this.style.color='#ffffff';"
                    onmouseout="this.style.color='#ffffff';"
                    title="Google+"
                    rel="publisher"
                  >
                    <span
                      class="fab fa-google-plus-g"
                      aria-hidden="true"
                    ></span>
                    <!-- <span class="fallback-text">Google</span> -->
                  </a>
                </li>

                <li>
                  <a
                    style="color: #ffffff"
                    class="icon-fallback-text tumblr text-decoration-none"
                    target="blank"
                    href="#"
                    onmouseover="this.style.color='#ffffff';"
                    onmouseout="this.style.color='#ffffff';"
                    title="Tumblr"
                  >
                    <span class="fab fa-tumblr" aria-hidden="true"></span>
                    <!-- <span class="fallback-text">Tumblr</span> -->
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="
              grid__item
              wide--one-third
              post-large--one-third
              large--one-third
              medium-down--one-whole
              small--grid__item
            "
          >
            <div class="footer-icons">
              <ul class="inline-list payment-icons">
                <li>
                  <a href="/cart"
                    ><img
                      src="images/card-icons_0001_22_small.png"
                      alt="payment_icon_1"
                  /></a>
                </li>
                <li>
                  <a href="/cart"
                    ><img
                      src="images/card-icons_0002_21_small.png"
                      alt="payment_icon_2"
                  /></a>
                </li>
                <li>
                  <a href="/cart"
                    ><img
                      src="images/card-icons_0009_14_small.png"
                      alt="payment_icon_3"
                  /></a>
                </li>
                <li>
                  <a href="/cart"
                    ><img
                      src="images/card-icons_0022_24_small.png"
                      alt="payment_icon_4"
                  /></a>
                </li>
                <li>
                  <a href="/cart"
                    ><img
                      src="images/card-icons_0023_1_small.png"
                      alt="payment_icon_5"
                  /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <div v-else>
    <NotFound :error="error" />
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import NotFound from "./NotFound.vue";
import API from "../axios";
import "../assets/css/css.css"
import "../assets/css/font-all.min.css"
import "../assets/css/frame.scss.css"
import "../assets/css/prettyPhoto.css"
import "../assets/css/slick-slider.css"
import "../assets/css/slick-theme.css"
import "../assets/css/slick.scss.css"
import "../assets/css/style.css"
export default {
  components: { NotFound },
  setup() {
    const data = ref([]);
    const error = ref("");
    const counter = ref(0)
    const route = useRoute();
    const router = useRouter();
    const productId = ref([])
    const search = ref("")
    const storename = route.params.storename;

    const addToCart = (id) => {
      if(!productId.value.includes(id)) {
        productId.value.push(id)
        localStorage.setItem("products", JSON.stringify(productId.value))
        counter.value = JSON.parse(localStorage.getItem("products")).length
      }
    }
    const removeFromCart = (id) => {
      productId.value = productId.value.filter((uid) => uid !== id)
      localStorage.setItem("products", JSON.stringify(productId.value))
      counter.value = JSON.parse(localStorage.getItem("products")).length
    }
    const clickSearch = () => {
      const input = document.querySelector("#input")
      input.focus()
    }
    const collection = computed(() => { 
      return data.value.items?.filter((datum) => {
      let name = datum.name ? datum.name : ''
      let description = datum.description ? datum.description : ''
      let price = datum.price ? datum.price.toString() : ''
      search.value = search.value.toLowerCase()
      if (name.match(search.value) || description.match(search.value) || price.match(search.value)) {
        return datum
      }
    })})
    onBeforeMount(async () => {
      data.value = await API.getCustomerStore(storename);
      error.value = data.value.error ? data.value.error : "";
      const { ok } = data.value;
      counter.value = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")).length : 0
      if(localStorage.getItem("products")) {
        counter.value = counter.value + JSON.parse(localStorage.getItem("products")).length
        productId.value = JSON.parse(localStorage.getItem("products"))
      }
      if (!ok) router.push({ name: "404", params: { message: error } });
      // else if (ok && !error.value) console.log(data.value);
    });
    return { data, error, counter, productId, addToCart, removeFromCart, search, clickSearch, collection };
  },
};
</script>

<style scoped>
/* Top block */
  @media(min-width: 500px) {
    footer {
      position: relative;
      bottom: -145px;
    }
  }
  .header-type-3 .top_bar {
    background: #ffffff;
  }
  .header-type-3 .top_bar li,
  .header-type-3 .top_bar span {
    color: #000000;
  }
  .header-type-3 .top_bar a {
    color: #000000;
  }
  .header-type-3 .top_bar a:hover,
  .header-type-3 .top_bar a:hover span {
    color: #35b8f4;
  }
  /* .header-type-3
    .header-bar__module.cart
    .baskettop
    a.icon-cart-arrow
    #cartCount {
    background: ;
    color: ;
  } */
  /* .header-type-3
    .header-bar__module.cart
    .baskettop
    a.icon-cart-arrow:hover
    #cartCount {
    background: ;
    color: ;
  } */
  .header-type-3 .top_bar .top_bar_right li span,
  .header-type-3 .tbl-list > li.currency > .dropdown-toggle {
    border-right: 1px solid #e4e4e4;
  }
  .header-type-3 .top_bar ul li:last-child,
  .header-type-3 .top_bar .top_bar_right li:last-child span {
    border-right: none;
  }

  /* Currency block */

  .header-type-3 a.currency_wrapper.dropdown-toggle {
    color: #000000;
  }
  .header-type-3 .tbl-list > li.currency > .dropdown-toggle:hover {
    color: #35b8f4;
  }
  .header-type-3 .tbl-list > li.currency .flag-dropdown-menu {
    background: #ffffff;
  }
  .header-type-3 .flag-dropdown-menu li a span {
    color: #000000;
  }
  /* .header-type-3 .flag-dropdown-menu li a:hover span {
    color: ;
  } */
  .header-type-3 .header_currency ul select,
  .header-type-3
    .header_currency
    ul
    li.currency
    .selector-arrow::after {
    color: #000000;
  }
  .header-type-3 .header_currency ul select:hover {
    color: #35b8f4;
  }
  .header-type-3 .header_currency ul li.currency:hover:after {
    border-top-color: #35b8f4;
  }
  .header-type-3 .header_currency ul li.currency:after {
    border-top-color: #000000;
  }
  .header-type-3 .header_currency option {
    background: #ffffff;
    color: #000000;
  }
  /* Top block */
  /* .header-type-3 .top_bar {
    background: ;
  } */
  /* .header-type-3 .top_bar li,
  .header-type-3 .top_bar span {
    color: ;
  }
  .header-type-3 .top_bar a {
    color: ;
  } */
  /* .header-type-3 .top_bar a:hover,
  .header-type-3 .top_bar a:hover span {
    color: ;
  } */
  .header-type-3
    .header-bar__module.cart
    .baskettop
    a.icon-cart-arrow
    #cartCount {
    background: #2b2b2b;
    color: #ffffff;
  }
  .header-type-3
    .header-bar__module.cart
    .baskettop
    a.icon-cart-arrow:hover
    #cartCount {
    background: #77be32;
    color: #ffffff;
  }

  /* Logo block */
  .header-type-3 .site-header__logo a {
    color: #2b2b2b;
  }
  .header-type-3 .site-header__logo a:hover {
    color: #ffffff;
  }

  /* Menu  block */
  .header-type-3 .site-header,
  .mobile-nav-section,
  .header-type-3 .sticky-animate {
    background: #ffffff;
  }
  /* .header-type-3 .menu-tool ul li {
    color: ;
  } */
  .header-type-3 .menu-tool ul li a,
  .mobile-nav-section .mobile-nav-trigger {
    color: #2b2b2b;
  }
  .header-type-3 .menu-tool ul li a:hover,
  .header-type-3
    .menu-tool
    .site-nav
    > li
    > a.current:hover {
    color: #77be32;
  }
  .header-type-3 .menu-tool .site-nav > li > a.current {
    color: #77be32;
  }
  .header-type-3 .site-nav-dropdown,
  #MobileNav,
  .mobile-nav__sublist {
    background: #ffffff;
  }
  .header-type-3 .site-nav-dropdown .inner > a {
    color: #77be32;
  }
  .header-type-3 .site-nav-dropdown .inner > a:hover {
    color: #77be32;
  }
  .header-type-3 .site-nav-dropdown .inner .dropdown a,
  .header-type-3
    .menu-tool
    .site-nav
    .site-nav-dropdown
    li
    a,
  .header-type-3
    .site-nav
    .widget-featured-product
    .product-title,
  .header-type-3
    .site-nav
    .widget-featured-product
    .widget-title
    h3,
  #MobileNav a,
  .mobile-nav__sublist a,
  .site-nav .widget-featured-nav .owl-prev a,
  .site-nav .widget-featured-nav .owl-next a {
    color: #2b2b2b;
  }
  .header-type-3
    .site-nav-dropdown
    .inner
    .dropdown
    a:hover,
  .header-type-3
    .menu-tool
    .site-nav
    .site-nav-dropdown
    li
    a:hover,
  .header-type-3
    .site-nav-dropdown
    .inner
    .dropdown
    a.current,
  .header-type-3
    .menu-tool
    .site-nav
    .site-nav-dropdown
    li
    a.current,
  .header-type-3
    .site-nav
    .widget-featured-product
    .product-title:hover,
  #MobileNav a.current,
  .mobile-nav__sublist a.current,
  .site-nav .widget-featured-nav .owl-prev a:hover,
  .site-nav .widget-featured-nav .owl-next a:hover {
    color: #77be32;
  }

  /* Dropdown block */
  .header-type-3 .menubar-section #Togglemodal i {
    color: #2b2b2b;
  }
  .header-type-3 .menubar-section #Togglemodal i:hover {
    color: #77be32;
  }
  .header-type-3 #slidedown-modal {
    background: #ffffff;
  }
  .header-type-3 #slidedown-modal ul li a {
    color: #000000;
    text-decoration: none;
  }
  .header-type-3 #slidedown-modal ul li a:hover {
    color: #77be32;
  }

  /* Search block */
  .header-type-3 .search-bar input[type="search"] {
    color: #2b2b2b;
  }
  .header-type-3 .header-search span {
    color: #2b2b2b;
  }
  .header-type-3 .header-search span:hover {
    color: #77be32;
  }
  .header-type-3 .search-bar__form button,
  .header-type-3 .search-bar__icon-button {
    color: #000000;
  }
  .header-type-3 .search-bar__form button:hover,
  .header-type-3 .search-bar__icon-button:hover {
    color: #77be32;
  }

  .header-type-3
    .search-bar
    input[type="search"]::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #2b2b2b;
  }
  .header-type-3
    .search-bar
    input[type="search"]::-moz-placeholder {
    /* Firefox 19+ */
    color: #2b2b2b;
  }
  .header-type-3
    .search-bar
    input[type="search"]:-ms-input-placeholder {
    /* IE 10+ */
    color: #2b2b2b;
  }
  .header-type-3
    .search-bar
    input[type="search"]:-moz-placeholder {
    /* Firefox 18- */
    color: #2b2b2b;
  }
  /* Cart Summary block */
  .header-type-3 a.icon-cart-arrow i {
    color: #2b2b2b;
  }
  .header-type-3 a.icon-cart-arrow:hover i {
    color: #77be32;
  }
  .header-type-3 #slidedown-cart .actions,
  .header-type-3 #slidedown-cart {
    background: #ffffff;
  }
  .header-type-3 .header-bar__module p {
    color: #2b2b2b;
  }
  .header-type-3 .header-bar__module a {
    color: #2b2b2b;
  }
  .header-type-3 .header-bar__module a:hover {
    color: #77be32;
  }
  .header-type-3 .header-bar__module .btn {
    color: #ffffff;
    background: #77be32;
  }
  .header-type-3 .header-bar__module .btn:hover {
    color: #ffffff;
    background: #000000;
  }
  .header-type-3 #slidedown-cart .total .price,
  .header-type-3 #minicart_total,
  .header-type-3
    #slidedown-cart
    ul
    li
    .cart-collateral {
    color: #2b2b2b;
  }
  .header-type-3 #slidedown-cart li {
    border-bottom: 1px solid #d02424;
  }

  .header-type-3 .site-nav .widget-featured-product {
    border: 1px solid #77be32;
  }

  .header-type-3 .site-header,
  .mobile-nav-section,
  .is-sticky .header-sticky {
    box-shadow: 0 3px 6px -2px rgba(0, 0, 0, 0.15);
  }

  /* Header borders */
  .footer-model-15 .copyright-section p a {
    color: #ffffff;
  }
  .footer-model-15 .copyright-section p a:hover {
    color: #ffffff;
  }
  .footer-model-15 .footer-bottom .footer-bottom__menu ul li a:hover {
    color: #11b00d !important;
  }
  .footer-model-15 .social-icons li a:hover {
    color: #ffffff !important;
  }
  .footer-model-15 .social-icons li a {
    color: #ffffff;
  }
  .bottom-products-suggest {
    background-color: #fff;
    border: 0;
    border-radius: 0;
    padding: 0;
    display: block;
    position: fixed;
    text-align: left;
    width: auto;
    min-width: 250px;
    left: 35px;
    bottom: 25px;
    z-index: 1000;
  }
  .bottom-products-suggest .product-short-suggest .product-thumb img {
    max-width: 50px;
  }
  .bottom-products-suggest .product-short-suggest {
    overflow: hidden;
    padding: 10px;
    background-color: #fff;
    border: 2px solid #efefef;
  }
  .bottom-products-suggest .product-short-suggest .product-thumb {
    float: right;
    margin-left: 10px;
  }
  .bottom-products-suggest .product-short-suggest .product-title {
    display: block;
    margin-bottom: 7px;
    font-weight: 500;
    font-size: 11px;
    line-height: 1.5;
    text-transform: uppercase;
  }
  .bottom-products-suggest .product-short-suggest .price del {
    color: #d0d0d0;
  }
</style>