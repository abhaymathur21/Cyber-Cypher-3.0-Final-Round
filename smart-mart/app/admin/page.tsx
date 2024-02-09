import LinePlot from "@/components/graphs/SalesLinePlot";
import products from "@/data/products.json";
import orders from "@/data/orders.json";
import { resolveNaptr } from "dns";

const Admin = () => {
  return (
    <div className="h-full overflow-y-auto">
      <h1>Admin Dashboard</h1>
      <table className="text-center">
        <tr>
          <th>Product</th>
          <th>Revenue</th>
          <th>Units Sold</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id} className="*:px-8 *:py-4 even:bg-secondary">
            <td>{product.name}</td>
            <td>
              $
              {(
                orders
                  .filter((order) =>
                    order.products?.some((p) => p.id === product.id),
                  )
                  .map(
                    (order) =>
                      order.products?.find((p) => p.id === product.id)
                        ?.quantity || 0,
                  )
                  .reduce((acc, quantity) => acc + quantity, 0) * product.price
              ).toFixed(2)}
            </td>
            <td>
              {orders
                .filter((order) =>
                  order.products?.some((p) => p.id === product.id),
                )
                .map(
                  (order) =>
                    order.products?.find((p) => p.id === product.id)
                      ?.quantity || 0,
                )
                .reduce((acc, quantity) => acc + quantity, 0)}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default Admin;
