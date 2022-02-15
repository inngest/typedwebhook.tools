<script lang="ts">
  export let text = "";
</script>

<div class="wrapper">
  <div class="loader" />
  <p>{text}</p>
</div>

<style>
.wrapper {
  margin: 3rem 0;
}

p {
  text-align: center;
  font-size: .8rem;
  opacity: .4;
  margin: 1rem 0;
}

.loader {
  opacity: .7;
  font-size: 10px;
  margin: 0 auto;
  text-indent: -9999em;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #ffffff;
  background: linear-gradient(to right, #b9b8b6, rgba(0, 0, 0, 0) 42%);
  position: relative;
  transform: translateZ(0);
  animation: anim 1.4s infinite linear;
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #c3c3c0;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: var(--bg-color);
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes anim {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes anim {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
