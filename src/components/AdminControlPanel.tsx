import AddProduct from "./AddProduct";
import MoneyManager from "./MoneyManager";
import ProductManager from "./ProductManager";
import ResetSessionButton from "./ResetSessionButton";

interface Props {
}

export default function AdminControlPanel({ }: Props) {
  
  return (
    <div >
        <AddProduct />
        <ResetSessionButton/>
        <MoneyManager/>
        <ProductManager />
    </div>
  );
}
