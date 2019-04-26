<template>
  <div>
    <div class="d-flex justify-content-center align-items-center mb-4">
        <div>
            <el-input
            placeholder="Новая локация"
            v-model="location"
            style="max-width: 300px"
            ></el-input>  
        </div>
        <div>
            <span class="ml-4 p-2 cursor-pointer col-green" @click="addLocation">
                <i class="fas fa-plus"></i>
            </span>
        </div>
    </div>
    

    <p class="mb-2">Доступные локации:</p>
    <p v-for="(loсation, key) in locations">{{ loсation }}
        <span class="cursor-pointer p-2 col-red" @click="removeLocation(key)">
            <i class="fas fa-times"></i>
        </span>
    </p>
</div>
</template>

<script>
	export default {
		name: 'locations',
		data: function () {
			return {
				loading: false,
                locations: null,
                location: ''
            }
        },
        mounted () {
            this.update();
            this.$eventHub.$on('update-locations', this.update);
        },
        beforeDestroy () {
            this.$eventHub.$off('update-locations');
        },
        methods: {
            update () {
                this.kvGet('locations').then(res => {
                    this.locations = res;
                });
            },
            addLocation () {
                if (this.location.length < 2) {
                    this.$message({
                        type: 'warning',
                        message: 'Слишком короткое имя!'
                    });
                } else {
                    this.locations.push(this.location);
                    this.location = '';
                    this.kvSet('locations', this.locations).then(res => {
                        this.$message({
                            type: 'success',
                            message: 'Вы успешно добавили локацию'
                        });
                    });
                }
            },
            removeLocation (i) {
                this.$confirm('Вы действительно хотите удалить данную локацию?', 'Внимание', {
                    confirmButtonText: 'Да',
                    cancelButtonText: 'Нет',
                    type: 'warning'
                }).then(() => {
                    this.locations.splice(i, 1);
                    this.kvSet('locations', this.locations);
                    this.$message({
                        type: 'success',
                        message: 'Вы успешно удалили локацию'
                    });
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
.col-green {
    color: #4d5;
}
.col-green:hover {
    color: #3c4;
}
.col-red {
    color: #d45;
}
.col-red:hover {
    color: #c34;
}
</style>
