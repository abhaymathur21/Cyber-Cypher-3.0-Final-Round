import LinePlot from "@/components/graphs/SalesLinePlot";
import products from "@/data/products.json";
import orders from "@/data/orders.json";

const Admin = () => {
  return (
    <div>
      <LinePlot data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
    </div>
  );
};
export default Admin;
