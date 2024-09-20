<template>
    <div class="breadcrumbs">
      <div class="container">
          <p>Start  >  Databas  >  Sök</p>
      </div>
    </div>
</template>


<style scoped>
div.breadcrumbs {
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1140px;
}

@media (max-width: 1140px) { div.breadcrumbs { max-width: 1140px;  }}
@media (max-width: 992px)  { div.breadcrumbs { max-width: 960px;   }}
@media (max-width: 768px)  { div.breadcrumbs { max-width: 720px;   }}
@media (max-width: 576px)  { div.breadcrumbs { max-width: 540px;   }}


div.breadcrumbs div.container {
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
}


div.breadcrumbs div.container p {
  line-height: 0.8rem;
  margin: 0;
}

</style>