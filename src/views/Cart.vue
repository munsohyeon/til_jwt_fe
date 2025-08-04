<script setup>
import { getItems, removeItem, removeItemAll } from '@/services/cartService';
import { reactive, onMounted } from 'vue';
import { computed } from 'vue';


const state = reactive({ items: [] });
const load = async () => {
    const res = await getItems();
    if(res === undefined || res.status !== 200) {
        return;
    }
    state.items = res.data;
}
const remove = async cartId => {
const res = await removeItem(cartId);
    if(res === undefined || res.status !== 200) {
        return;
    }
    load();
    //다시 리로딩
    //or
    //방금 삭제한 객체만 state.items에서 삭제한다.
}

// 장바구니 총합계
const totalPrice = computed(() => {
    return state.items.reduce((sum, item) => {
        const discountedPrice = item.price - (item.price * item.discountPer / 100);
        return sum + discountedPrice;
    }, 0);
});

const clear = async () => {
    const res = await removeItemAll();
    if (res === undefined || res.status !== 200) {
        alert('장바구니 비우기에 실패했습니다.');
        return;
    }
    state.items = [];
    alert('장바구니를 모두 비웠습니다.');
}

onMounted(() => {
    load();
});
</script>

<template>
    <div class="cart">
        <div class="container">
            <template v-if="state.items.length">
                <ul class="items">
                    <li v-for="item in state.items">
                        <img :alt="`상품 사진(${item.name})`" :src="`/pic/item/${item.imgPath}`" />
                        <b class="name">{{ item.name }}</b>
                        <span class="price">
                            {{ (item.price - item.price * item.discountPer / 100).toLocaleString() }}원
                        </span>
                        <span class="remove float-end" @click="remove(item.id)" title="삭제">&times;</span>
                    </li>
                </ul>
                    <div class="cart-summary">
                        <div class="summary-box">
                            <div class="summary-title">총 합계</div>
                                <div class="summary-value">{{ totalPrice.toLocaleString() }}원</div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div class="act d-flex justify-content-between">
                    <button @click="clear" class="btn" id="cartBox">장바구니 비우기</button>
                    <router-link to="/order" class="btn btn-primary">주문하기</router-link>
                </div>
            </template>
            <template v-else>
                <div class="text-center py-5">장바구니가 비어있습니다.</div>
            </template>
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
}
.cart {
    li { border: 1px solid #eee; margin-top: 25px; margin-bottom: 25px; }
    img { width: 150px; height: 150px; }

    .items { list-style: none; margin: 0; padding: 0; }
    .name { margin-left: 25px; }
    .price { margin-left: 25px; }
    .remove { cursor: pointer; font-size: 30px; padding: 5px 15px; }    
}

.act .btn { width: 300px; display: block; margin: 0 auto; padding: 30px 50px; font-size: 20px; }

.cart {
  li {
    border: 1px solid #eee;
    margin: 25px 0;
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }

  .items {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .name {
    margin-left: 25px;
    flex: 1;
    font-size: 16px;
    font-weight: 500;
  }

  .price {
    font-size: 16px;
    margin-left: 10px;
    color: #555;
  }

  .remove {
    cursor: pointer;
    font-size: 28px;
    padding: 5px 15px;
    color: #dc3545;
  }

  .cart-summary {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
  }

  .summary-box {
    background-color: #fefefe;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px 30px;
    text-align: left;
    width: 100%;
    max-width: 400px;
    font-size: 18px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .summary-title {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
  }

  .summary-value {
    color: #007bff;
    font-weight: bold;
    font-size: 24px;
  }

  .act {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .act .btn {
    width: 300px;
    padding: 15px 30px;
    font-size: 18px;
    border-radius: 8px;
  }
  #cartBox {
    background-color: #FFC40C;
    color: #FFF;
  }
}

</style>