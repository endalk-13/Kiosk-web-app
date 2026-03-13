import { useStore } from "../StoreContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, sendOrderToKitchen } = useStore();
  const navigate = useNavigate();

  const handleConfirm = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    sendOrderToKitchen(total);

    navigate("/kitchen");
  };

  return (
    <button onClick={handleConfirm}>
      Confirm Order
    </button>
  );
};