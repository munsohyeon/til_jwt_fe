<script setup>
import { onMounted, reactive } from 'vue';
import { getOrder } from '@/services/orderService';

const state = reactive({
    orders: []
});

const load = async () => {
    const res = await getOrder();
    if (res === undefined || res.status !== 200) {
        alert('오류 발생');
        return;
    }
    state.orders = res.data;
}

onMounted(async () => {
    await load();
});

</script>

<template>
  <div class="orders">
    <div class="container">
      <table class="table table-bordered my-4">
        <thead>
        <tr>
          <th class="text-center">번호</th>
          <th class="order-name">주문자명</th>
          <th>결제 수단</th>
          <th>결제 금액</th>
          <th>결제일시</th>
          <th>자세히 보기</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(o, idx) in state.orders">
          <td class="text-center">{{ state.orders.length - idx }}</td>
          <td>{{ o.name }}</td>
          <td>{{ o.payment === 'card' ? '카드' : '무통장입금' }}</td>
          <td>{{ o.amount.toLocaleString() }}원</td>
          <td>{{ o.created.toLocaleString() }}</td>
          <td>
            <router-link :to="`/orders/${o.id}`">자세히 보기</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
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
    font-size: 1.2em;
}
.orders {
  background-color: #f8f9fa;
  padding: 2rem 0;

  .container {
    max-width: 1000px;
    margin: 0 auto;
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: #343a40;
      color: white;

      th {
        padding: 1rem;
        text-align: center;
        font-weight: 600;
        font-size: 0.95rem;
      }
    }

    tbody {
      tr {
        &:nth-child(even) {
          background-color: #f1f3f5;
        }

        &:hover {
          background-color: #e9ecef;
        }

        td {
          padding: 0.9rem 1rem;
          font-size: 0.95rem;
          vertical-align: middle;
          text-align: center;

          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5) {
            text-align: left;
          }

          a {
            color: #007bff;
            text-decoration: none;
            font-weight: 500;

            &:hover {
              text-decoration: underline;
              color: #0056b3;
            }
          }
        }
      }
    }
  }
}

</style>