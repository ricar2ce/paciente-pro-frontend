<template>
  <div class="bg-white">
    <main class="mt-0 main-content">
      <section>
        <div class="page-header min-vh-100">
          <div class="container">
            <div class="row">
              <div
                class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
              >
                <div
                  class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('~/assets/img/doctores.png') +
                      ')',
                  }"
                ></div>
              </div>
              <div
                class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
              >
                <div class="card card-plain">
                  <div class="pb-0 card-header text-center bg-transparent mb-4">
                    <h4 class="font-weight-bolder">Sign In</h4>
                    <p class="mb-0">Enter your email and password to sign in</p>
                  </div>
                  <div class="card-body">
                    <form role="form">
                      <div class="mb-3">
                        <material-input
                          id="email"
                          type="email"
                          label="Email"
                          name="email"
                          size="lg"
                        />
                      </div>
                      <div class="mb-3">
                        <material-input
                          id="password"
                          type="password"
                          label="Password"
                          name="password"
                          size="lg"
                        />
                      </div>
                      <material-switch id="rememberMe" name="Remember Me"
                        >Remember me</material-switch
                      >

                      <div class="text-center">
                        <material-button
                          class="mt-4"
                          variant="gradient"
                          color="success"
                          full-width
                          size="lg"
                          >Sign in</material-button
                        >
                      </div>
                    </form>
                  </div>
                  <div class="px-1 pt-0 text-center card-footer px-lg-2">
                    <p class="mx-auto mb-4 text-sm">
                      Don't have an account?
                      <router-link
                        :to="{ name: 'Signup Cover' }"
                        class="text-success text-gradient font-weight-bold"
                        >Sign up</router-link
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import MaterialInput from "components/MaterialInput.vue";
import MaterialSwitch from "components/MaterialSwitch.vue";
import MaterialButton from "components/MaterialButton.vue";
const body = document.getElementsByTagName("body")[0];
</script>
