

/*
==========
Cart Page 
==========
*/


// Empty Cart Array
const cart = []

// Action Object with Type & Payload
const handleCart = (state=cart, action) =>{
    const product = action.payload
    switch(action.type){
        case "ADDITEM":

            // Check If Product Already In Cart
            const exist = state.find((x) => x.id === product.id)
            if(exist){

                // Increase The Quantity
                return state.map((x)=>x.id ===product.id?{...x, qty: x.qty+1}:x)
            }
            else{
                return [...state, {...product, qty:1}]
            }
            break;
        case "DELITEM":

            // Check If Product Already In Cart
            const exist2 = state.find((x) => x.id === product.id)
            if(exist2.qty === 1){

                // Decrease The Quantity
                return state.filter((x)=>x.id!==exist2.id)
            }
            else{
                return state.map((x)=> x.id===product.id?{...x, qty:x.qty-1}:x)
            }
            break;

        default:
            return state
            break;
    }
}

export default handleCart