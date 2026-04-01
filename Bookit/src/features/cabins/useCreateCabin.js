import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
	const queryClient = useQueryClient();
	const {
		isLoading,
		isCreating,
		mutate: createCabin,
	} = useMutation({
		mutationFn: createEditCabinApi,
		onSuccess: () => {
			toast.success("New Cabin successifully created");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return {
		isCreating,
		createCabin,
	};
}
