import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, getLowStockProducts, addProduct, updateProduct, deleteProduct } from "@/lib/actions/product.actions";
import toast from "react-hot-toast";

export function useProducts(params = {}) {
  const queryClient = useQueryClient();

  const fetchProducts = useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      return await getProducts(params);
    },
  });

  const fetchLowStock = useQuery({
    queryKey: ["products", "low-stock"],
    queryFn: async () => {
      return await getLowStockProducts();
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      return await addProduct(newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add product");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await updateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update product");
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });

  return {
    products: fetchProducts.data,
    isLoading: fetchProducts.isLoading,
    isError: fetchProducts.isError,
    lowStock: fetchLowStock.data,
    addProduct: addProductMutation.mutateAsync,
    updateProduct: updateProductMutation.mutateAsync,
    deleteProduct: deleteProductMutation.mutateAsync,
    isAdding: addProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,
  };
}
