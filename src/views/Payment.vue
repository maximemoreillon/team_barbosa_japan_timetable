<template>
  <div class="main_wrapper">
    <header>
      Team Barbosa Japan
    </header>

    <main>
      <h1>Plans</h1>

      <table>
        <tr v-for="(plan, index) in plans" v-bind:key="`plan_${index}`">
          <td>{{plan.name}}</td>
          <td>{{plan.price}}円（税込）</td>
          <td>
            <button type="button" @click="checkout(plan.id)">Subscribe</button>
          </td>
        </tr>

      </table>
    </main>


  </div>
</template>


<script>
import {loadStripe} from '@stripe/stripe-js';


export default {
  name: 'Payment',
  components: {

  },
  data() {
    return {
      stripe: null,
      plans: [

        {
          name: '月会費 MONTHLY FEE 一般女性 REGULAR PRICE WOMEN',
          id: 'plan_HJN1vgycsLiBgK',
          price: 7000,
        },
        {
          name: '月会費 MONTHLY FEE 一般男性 REGULAR PRICE MEN',
          id: 'plan_HJMQMSv5qvE28Q',
          price: 10000,
        },
        {
          name: '学生（高校生・大学生 男女とも）UNDER18（社会人） STUDENTS (HIGH SCHOOL & UNIVERSITY) AND UNDER 18',
          id: 'plan_HJMRwUxb3jMJZa',
          price: 5000,
        },
        {
          name: 'キック会員・月会費 KICK BOXING 一般男性/女性 REGULAR PRICE MEN / WOMEN',
          id: 'plan_HJMQMSv5qvE28Q',
          price: 7000,
        },
      ]
    }
  },
  mounted(){
    this.load_stripe()
  },
  methods: {
    async load_stripe(){
      this.stripe = await loadStripe('pk_test_zt06q9eIOWiMHZF8leVk9Zns00eIj8fm55')
    },
    checkout(plan_id){
      this.stripe.redirectToCheckout({
        lineItems: [{price: plan_id, quantity: 1}],
        mode: 'subscription',
        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: 'https://barbosajapan.maximemoreillon.com/payment',
        cancelUrl: 'https://barbosajapan.maximemoreillon.com/payment',
      })
      .then(function (result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          alert('Payment failed')
        }
      });
    }
  }
}
</script>

<style scoped>

header {
  padding: 0.5em;
  background-color: #444444;
  color: white;
  font-size: 120%;
  font-weight: bold;
}
main {
  margin: 0 1em;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr:not(:last-child){
  border-bottom: 1px solid #dddddd;
}
tr:hover{
  background: #eeeeee;
}
td {
  padding: 0.25em;
}
button {
  border: 1px solid black;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
}
</style>
