<template>
  <Carousel loop>
      <CarouselItem>
          <div class="carousel">1</div>
      </CarouselItem>
      <CarouselItem>
          <div class="carousel">2</div>
      </CarouselItem>
      <CarouselItem>
          <div class="carousel">3</div>
      </CarouselItem>
      <CarouselItem>
          <div class="carousel">4</div>
      </CarouselItem>
  </Carousel>
</template>
<script>
export default {
  name: 'LayoutModuleCarousel',
  data () {
    return {
    }
  }
}
</script>
<style lang="css" scoped>
.carousel{
  height: 400px;
}
</style>
