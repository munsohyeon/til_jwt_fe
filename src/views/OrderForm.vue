<script setup>
import { getItems } from '@/services/cartService.js';
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { addOrder } from '@/services/orderService';

const router = useRouter();

const state = reactive({
    items: [],
    form: {
        name: '',
        address: '',
        payment: 'card',
      cardNumber: '',
        itemIds: []
    }
});

const submit = async () => {
  if (state.form.payment !== 'card') { // 결제수단이 카드가 아니라면
    // 카드번호를 지운다.
    state.form.cardNumber = '';
  }
  // id값을 순차적으로 넣어주세요
  state.form.itemIds = state.items.map(i => i.itemId);
  const res = await addOrder(state.form);
  if (res === undefined || res.status !== 200) {
    alert('에러 발생');
    return;
  }
  const message = ['주문이 완료되었습니다.']
  if (state.form.payment === 'bank') {
    const price = computedTotalPrice.value.toLocaleString();
    message.push(`한국은행 123-456-777 계좌로 ${price}원을 입금해주시기 바랍니다.`);
  }
  alert(message.join('\n'));
  await router.push('/');
}

onMounted(async () => {
  const res = await getItems();
  if (res === undefined || res.status !== 200) {
    return;
  }
  state.items = res.data;
})

const computedTotalPrice = computed(() => {
  // return state.items.reduce((acc, item) => {
  //   const discountedPrice = item.price * (1 - item.discountPer / 100);
  //   return acc + discountedPrice;
  // }, 0);
  let result = 0;
  state.items.forEach((i) => {
    result += i.price - i.price * i.discountPer / 100;
  });
  
  return result;
});


</script>

<template>
    <form class="order-form" @submit.prevent="submit">
      <div class="container">
        <div class="py-5 text-center">
          <div class="h4">
            <b>주문하기</b>
          </div>
          <p class="h6 font-lg mt-3">
            주문 내역을 확인하시고 주문하기 버튼을 클릭해주세요
          </p>
        </div>
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last">
            <div class="mb-3">
              <span class="h5 mb-3 align-middle me-2">
                <b>구입 목록</b>
              </span>
              <span class="badge bg-primary rounded-pill align-middle">{{
                state.items.length
              }}</span>
            </div>
            <ul class="items list-group mb-3">
              <li
                class="p-3 list-group-item d-flex justify-content-between"
                v-for="i in state.items"
              >
                <div>
                  <h6 class="my-0">{{ i.name }}</h6>
                </div>
                <span class="text-muted">
                  {{
                    (i.price - (i.price * i.discountPer) / 100).toLocaleString()
                  }}
                  원
                </span>
              </li>
            </ul>
              <div class="deadline-alert">
                ⏰ 마감임박!
              </div>
            <div class="border p-4 bg-light h5 rounded text-center total-price">
              <span>합계 </span>
              <b>{{ computedTotalPrice.toLocaleString() }}원</b>
            </div>
            <button type="submit" class="w-100 btn btn-primary py-4 mt-4">
              결제하기
            </button>
          </div>
          <div class="col-md-7 col-lg-8">
            <div class="h5 mb-3">
              <b>주문자 정보</b>
            </div>
            <div class="row g-3">
              <div class="col-12">
                <label for="name" class="form-label">이름</label>
                <input
                  type="text"
                  class="form-control p-3"
                  id="name"
                  v-model="state.form.name"
                />
              </div>
              <div class="col-12 pt-1">
                <label for="address" class="form-label">주소</label>
                <input
                  type="text"
                  class="form-control p-3"
                  id="address"
                  v-model="state.form.address"
                />
              </div>
            </div>
            <div class="h5 mt-5 mb-3">
              <b>결제 수단</b>
            </div>
            <div class="my-3">
              <div class="form-check">
                <input
                  id="card"
                  name="paymentMethod"
                  type="radio"
                  class="form-check-input"
                  value="card"
                  v-model="state.form.payment"
                />
                <label class="form-check-label" for="card">신용카드</label>
              </div>
              <div class="form-check">
                <input
                  id="bank"
                  name="paymentMethod"
                  type="radio"
                  class="form-check-input"
                  value="bank"
                  v-model="state.form.payment"
                />
                <label class="form-check-label" for="bank">무통장 입금</label>
              </div>
            </div>
            <div class="pt-1" v-if="state.form.payment === 'card'">
              <label for="cardNum" class="form-label">카드 번호</label>
              <input
                type="text"
                class="form-control p-3"
                id="cardNum"
                v-model="state.form.cardNumber"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </template>

<style lang="scss" scoped>
@font-face {
    font-family: 'LeeSeoyun';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
* {
    font-family: 'LeeSeoyun';
}
.order-form {
  background: linear-gradient(to right, #f8f9fa, #ffffff);
  padding: 30px 0;

  .deadline-alert {
  background-color: tomato;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;
  animation: blinkTomato 1.2s infinite;
  box-shadow: 0 0 10px rgba(255, 99, 71, 0.7);
}

  .text-center {
    color: #333;

    .h4 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #343a40;
      animation: pop 0.5s ease-in-out;
    }

    .h6 {
      color: #6c757d;
      font-style: italic;
    }
  }

  .items {
    max-height: 300px;
    overflow-y: auto;

    li {
      border: 1px solid #dee2e6;
      border-radius: 10px;
      background-color: #fff;
      margin-bottom: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      h6 {
        font-size: 1rem;
        font-weight: 600;
      }

      .text-muted {
        color: #20c997;
        font-weight: bold;
      }
    }
  }

  .total-price {
    background-color: #fff3cd;
    border: 2px dashed #ffc107;
    color: #856404;
    font-weight: bold;
    font-size: 1.3rem;
    animation: pulse 1.2s infinite;
  }

  .form-label {
    font-weight: 600;
    color: #343a40;
  }

  .form-control {
    border-radius: 8px;
    font-size: 1rem;
    border: 1px solid #ced4da;
    transition: box-shadow 0.3s;

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
      border-color: #86b7fe;
    }
  }

  .btn-primary {
    background-color: #0d6efd;
    border: none;
    font-size: 1.25rem;
    transition: all 0.3s ease;
    border-radius: 10px;

    &:hover {
      background-color: #084298;
      transform: scale(1.02);
    }
  }

  .form-check {
    label {
      font-weight: 500;
      margin-left: 8px;
      color: #495057;
    }
  }

  .badge {
    font-size: 1rem;
    padding: 8px 14px;
  }
}

@keyframes blinkTomato {
  0%, 100% {
    background-color: tomato;
    opacity: 1;
    transform: scale(1);
  }
  50% {
    background-color: #ff6347cc;
    opacity: 0.85;
    transform: scale(1.03);
  }
}


</style>