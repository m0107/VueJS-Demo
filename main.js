Vue.component('product',{
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
	<div class="product">
		<div class="product-image">
			<img alt="sock image" :src="image">
		</div>
		<div class="product-info">
			<h1>{{ title }}</h1>
			<p v-if="inStock">In Stock</p>
			<p v-else>Out of Stock</p>
			<p>Shipping: {{shipping}}</p>
			<ul>
				<li v-for="detail in details">
					{{detail}}
				</li>
			</ul>
			<div	v-for="(variant, index) in variants" 
					:key="variant.variantID" 
					class="color-box"
					:style="{ backgroundColor: variant.variantColor}"
					@mouseover="updateProduct(index) " >
			</div>
			<button v-on:click="addTocart()" 
					:disabled="!inStock"
					:class="{disabledButton:!inStock}">Add to Cart</button>
		</div>
	</div>
	`,
	data() {
		return {
			brand: "Rebook",
			product: 'Socks',
			selectedVariant: 0,
			details: ["80% Cotton", "20% Polyester", "Gender-neutral"],
			variants: [
				{
					variantID: 2034,
					variantColor: "blue",
					variantImage: "../asset/vmSocks-blue-onWhite.jpg",
					variantQuantity: 10
				},
				{
	
					variantID: 2035,
					variantColor: "green",
					variantImage: "../asset/vmSocks-green-onWhite.jpg",
					variantQuantity: 0
				}
			]
		}
	},
	methods: {
		addTocart: function() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID);
		},
		updateProduct: function(index) {
			this.selectedVariant = index;
		}
	},
	computed: {
		title() {
			return this.brand+" "+this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		shipping() {
			if (this.premium)
				return "Free"
			return 2.99;
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: []
	},
	methods: {
		updateCart : function (id){
			this.cart.push(id) ;
		}
	}
})