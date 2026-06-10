import { asyncWrapper } from "../../../../utils/asyncWrapper.js"
import { createOrderService } from "../service/order.service.js"


export const createOrderController = asyncWrapper(async (req, res) => {
  
  const { userId, items, details } = req.body; 
  console.log(req.body);
  

  const orderDetails = await createOrderService(userId, items, details); 
  
  res.status(201).json({
    status: true, 
    message: 'Order is created', 
  })
}); 


