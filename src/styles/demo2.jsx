const addtoCart = async (req, res) => {
    try {
      const { userID } = req.params;
      const {id} = req.body
      const user = await Users.findByIdAndUpdate(
        userID,
        {
          $push: {
            cart: {
              productID: id, // Assuming id is the product ID you want to add
              quantity: 1,  // You can adjust the quantity as needed
            },
          },
        },
        { new: true } // To return the updated user document
      );
  
      res
        .status(200)
        .json({ message: "successfully added to cart"});
    } catch (error) {
      res.status(400).json({ message: "unable to add ", error });
    }
  };
  const removefromcart = async (req, res) => {
    try {
      const { userID } = req.params;
      const { id } = req.body;
  
      // Use updateOne instead of findOne
      await Users.updateOne({ _id: userID }, { $pull: { cart:{productID:id}  } });
  
      // Fetch the updated user after the update
      const user = await Users.findById(userID);
  
      res.status(200).json({
        message: "Successfully removed from cart",
        likedlist: user.liked,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Unable to remove" });
    }
  };
  const updatequantity = async (req, res) => {
    try {
      const { userID } = req.params;
      const {id,quantity} = req.body
    console.log("quantity",quantity)
  const product = await Products.findById(id)
  if(quantity>product.stoke)
  {
    return  res.status(400).json({
      message: "Stoke limit exceeded"
      
    });
  }
  
   const updated =  await Users.findByIdAndUpdate(
      userID,
      {
        $set: {
          "cart.$[item].quantity": quantity,
        },
      },
      {
        arrayFilters: [{ "item.productID": id }],
        new: true,
      }
    );
  
  
    res.status(200).json({
      message: "Successfully updated",
      quantity:updated,
    });
   }
  
   
   
   
     catch (error) {
     res.status(400).json({message:"unable to update"})
    }
  };