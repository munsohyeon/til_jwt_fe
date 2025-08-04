<script setup>
import { getItems } from '@/services/itemService';
import { onMounted, reactive } from 'vue';
import { useGlobalErrorStore } from '@/stores/global-error';

const globalErrorStore = useGlobalErrorStore();

import Card from '@/components/Card.vue';

const state = reactive({
  items: []
});

onMounted(async () => {
  const res = await getItems();
  if(res.status !== 200) { return; }
  console.log('res.data:', res.data);
  state.items = res.data;
});

/*
이 화면이 마운트될 때 딱 한번 getItems 통신하시고
통신으로 받아온 데이터를 콘솔에 뿌려주시오.
*/
</script>

<template>
    <div class="snowflakes" aria-hidden="true">
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
    </div>

  <div class="home">
    <b-modal v-model="globalErrorStore.state.isShow" ok-only>{{ globalErrorStore.state.errorMessage }}</b-modal>
    <div class="album py-5">
      <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
          <div class="col" v-for="item in state.items">
            <card :item="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
    font-family: 'LeeSeoyun';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
* {
    font-family: 'LeeSeoyun';
}
.album {
  background-color: #c0ddff; 
}
.snowflakes {
  pointer-events: none; /* 클릭 방지 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999; /* 가장 위에 표시 */
  overflow: visible;
}

.snowflake {
  color: white;
  font-size: 1.5rem;
  font-family: Arial, sans-serif;
  position: absolute;
  top: -2rem;
  user-select: none;
  animation-name: fall, sway;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-direction: normal, alternate;
  opacity: 0.8;
}

/* 눈송이 위치 무작위 */
.snowflake:nth-child(1) {
  left: 1%;
  animation-delay: 0s, 0s;
}
.snowflake:nth-child(2) {
  left: 10%;
  animation-delay: 2s, 1s;
  font-size: 1.2rem;
  opacity: 0.6;
}
.snowflake:nth-child(3) {
  left: 20%;
  animation-delay: 4s, 2s;
}
.snowflake:nth-child(4) {
  left: 30%;
  animation-delay: 1s, 0.5s;
  font-size: 1.8rem;
  opacity: 0.9;
}
.snowflake:nth-child(5) {
  left: 40%;
  animation-delay: 3s, 1.5s;
  font-size: 1.3rem;
}
.snowflake:nth-child(6) {
  left: 50%;
  animation-delay: 5s, 1s;
  opacity: 0.7;
}
.snowflake:nth-child(7) {
  left: 60%;
  animation-delay: 6s, 0s;
  font-size: 1.4rem;
}
.snowflake:nth-child(8) {
  left: 70%;
  animation-delay: 4s, 2.5s;
  opacity: 0.8;
}
.snowflake:nth-child(9) {
  left: 80%;
  animation-delay: 7s, 1s;
  font-size: 1.6rem;
}
.snowflake:nth-child(10) {
  left: 90%;
  animation-delay: 8s, 0.5s;
  opacity: 0.6;
}

/* 눈송이 아래로 떨어지는 애니메이션 */
@keyframes fall {
  0% {
    top: -2rem;
    opacity: 0.8;
  }
  100% {
    top: 110vh;
    opacity: 0;
  }
}

/* 좌우로 살짝 흔들리는 애니메이션 */
@keyframes sway {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
}

</style>