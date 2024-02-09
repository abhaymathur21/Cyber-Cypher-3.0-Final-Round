import products from "@/data/products.json";
import Image from "next/image";

const ProductPage = ({ params: { id } }: { params: { id: string } }) => {
  const product = products.find((product) => product.id === parseInt(id));
  if (!product)
    return <div className="mt-8 text-center text-2xl">Product not found</div>;
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Image
          src={`https://picsum.photos/seed/${product.id}/300/300`}
          alt={product.name}
          width={300}
          height={300}
          className="aspect-square w-full place-self-center rounded-md object-cover object-center"
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="mt-4 text-lg">${product.price}</p>
        <p className="mt-4 w-[30ch] text-lg">{product.description}</p>
      </div>
    </div>
  );
};
export default ProductPage;
