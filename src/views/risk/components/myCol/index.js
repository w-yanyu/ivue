import myColComponent from './myCol.vue'

const  myCol = {
	install: function(Vue) {
		Vue.component('myCol',myColComponent)
	}
}

export default myCol