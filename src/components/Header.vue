<script setup>
import { useAccountStore } from '@/stores/account';
import { logout } from '@/services/accountService';

const account = useAccountStore();

//로그아웃
const logoutAccount = async () => {
  if (!confirm('로그아웃 하시겠습니까?')) {
    return;
  }
  const res = await logout();
  if (res === undefined || res.status !== 200) {
    return;
  }
  account.logout();
};
</script>

<template>
    <header>
        <div class="navbar custom-navbar text-white shadow-sm">
            <div class="container">
                <router-link to="/" class="navbar-brand">
                    <strong>Gallery</strong>
                </router-link>
                <div class="menus d-flex gap-3">
                    <template v-if="account.state.isSigned">
                        <a @click="logoutAccount">로그아웃</a>
                        <router-link to="/orders">주문 내역</router-link>
                        <router-link to="/cart">장바구니</router-link>                        
                    </template>
                    <template v-else>
                        <router-link to="/login">로그인</router-link>
                        <router-link to="/join">회원가입</router-link>
                    </template>
                </div>
            </div>
        </div>
    </header>
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
strong{
    font-size: 1.5em;
}
header {
    .custom-navbar {
    background: linear-gradient(135deg, #FFF);
    padding: 10px 0;
    .navbar-brand {
      color: #558BCF !important;

      &:hover {
        color: #0962cf !important
      }
  }
    .menus {
        a {        
            cursor: pointer;                
            color: #558BCF;
            text-decoration: none;
        }
    }
}
}
</style>