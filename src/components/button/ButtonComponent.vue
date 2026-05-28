<script setup>
defineProps({
  'btnType': {
    type: String,
    default: 'button'
  }, // 'button', 'submit', 'reset'
  'size': String, // 'big', 'middle', 'small'
  'color': String, // 'black', 'white', 'gray'
  'content': String
});
</script>

<template>
  <button 
    :type="btnType"
    :class="[color, size]"  
  >{{ content }}
  </button>
</template>

<style scoped>
button {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}

.big {
  width: 350px;
  height: 45px;
  font-size: 20px;
}

.middle {
  width: 300px;
  height: 70px;
  font-size: 40px;
}

.small {
  width: 90px;
  height: 45px;
  font-size: 20px;
}

.black {
  background-color: var(--personal-color-black);
  color: var(--personal-color-white);
}

.white {
  background-color: var(--personal-color-white);
  color: var(--personal-color-black);
}

.gray {
  background-color: var(--personal-color-gray);
  color: var(--personal-color-white);
}
</style>