import axios from 'axios'

export const saveCard=async(cart,user_id)=>{
    try{
        const {data} = await axios.post("/api/user/saveCart",{
            cart,
            user_id
        })
        return data; 
    }catch(error){
        return response.data.error.message
    }
}