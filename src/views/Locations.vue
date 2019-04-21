<template>
  <div>
    <p>Доступные локации:</p>
    <p v-for="loсation in locations">{{ loсation }}</p>
  </div>
</template>

<script>
	export default {
		name: 'locations',
		data: function () {
			return {
				loading: false,
                locations: [
                'База террористов',
                'Банк',
                'Больница',
                'Киностудия',
                'Корпоративная вечеринка',
                'Овощебаза',
                'Пассажирский поезд',
                'Пиратский корабль',
                'Ресторан',
                'Супермаркет'
                ]
			}
		}
	}
</script>