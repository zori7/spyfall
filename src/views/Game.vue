<template>
	<div>
		<div v-if="!distribution && !playing">
			<p>
				Количество игроков:
				<el-input-number v-model="playersCount" :min="3" :max="15" class="ml-4"></el-input-number>
			</p>
			<p>
				Таймер (мин):
				<el-input-number v-model="timerMins" :min="1" :max="15" class="ml-4"></el-input-number>
			</p>
			<el-button @click="startGame">Начать</el-button>
		</div>
		<div v-if="distribution">
			<transition name="flip" mode="out-in">
				<div key="1" class="player-card cursor-pointer" v-if="cardVisible" @click="passMove">
					Ваша карта: {{ cards[currentCardNumber].isSpy ? 'Вы - шпион!' : this.location }}
				</div>
				<div key="2" class="player-card cursor-pointer" v-else @click="showCard">
					<p>Показать...</p>
				</div>
			</transition>
		</div>
		<div v-if="playing && remains">
			Осталось {{ remains.mins > 0 ? remains.mins + ' минут' : remains.secs + ' Секунд' }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'game',
		data: function () {
			return {
				loading: false,
				distribution: false,
				playing: false,
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
				],
				playersCount: 5,
				timerMins: 5,
				location: null,
				cards: [],
				cardVisible: false,
				currentCardNumber: null,
				spy: null,
				timer: {
					mins: 0,
					secs: 0
				},
				endTime: null,
				now: null,
				interval: null
			}
		},
		computed: {
			remains () {
				if (this.now === null || this.endTime === null) {
					return null;
				}
				let mins = this.endTime.diff(this.now, 'minutes');
				let secs = this.endTime.diff(this.now, 'seconds');
				return {
					mins: mins,
					secs: secs
				}
			}
		},
		watch: {
			now () {
				if (this.now !== null && this.endTime !== null) {
					if (this.now.isAfter(this.endTime)) {
						clearInterval(this.interval);
						this.interval = null;
						this.timer = {
							mins: 0,
							secs: 0
						};
						this.spy = null;
						this.cards = [];
						this.location = null;
						this.playing = null;
						this.endTime = null;
						this.now = null;
					}
				}
			}
		},
		mounted () {
			// console.log(moment().format());
		},
		methods: {
			startGame () {
				let spy = this.getRandomInt(0, this.playersCount);
				this.spy = spy;
				this.location = this.locations[this.getRandomInt(0, this.locations.length)];
				for (let i = 0; i < this.playersCount; i++) {
					let isSpy = i === spy;
					this.cards.push({
						isSpy: isSpy
					});
				}
				this.distribution = true;
			},
			showCard () {
				if (this.currentCardNumber === null) {
					this.currentCardNumber = 0;
				} else {
					this.currentCardNumber++;
				}
				this.$nextTick(() => {
					this.cardVisible = true;
				});
			},
			passMove () {
				this.cardVisible = false;
				if (this.currentCardNumber === this.playersCount - 1) {
					this.currentCardNumber = null;
					this.distribution = false;
					this.playing = true;
					this.endTime = moment().add(this.timerMins, 'minutes');
					this.interval = setInterval(() => {
						this.now = moment();
					}, 1000);
				}
			},
			getRandomInt (min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			}
		}
	}
</script>

<style scoped>
.player-card {
	min-width: 150px;
	min-height: 300px;
	max-height: 600px;
	max-width: 300px;
	margin: 0 auto;
	border-radius: 5px;
	background: #f9ffff;
	padding: 5px;
}
.cursor-pointer {
	cursor: pointer;
}
</style>
