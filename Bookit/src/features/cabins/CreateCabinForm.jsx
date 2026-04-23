import React from "react";

import { Textarea } from "../../ui/TextArea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// We use react-hook-form to make working with complex and REAL-WORLD forms a lot easier. It handles stuff like user validation and errors. manages the form state for us, etc
// Validating the user’s data passed through the form is a crucial responsibility for a developer.
// React Hook Form takes a slightly different approach than other form libraries in the React ecosystem by adopting the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.

// Receives closeModal directly from Modal
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();

	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, formState, getValues } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	function submit(data) {
		const image =
			typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				},
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				},
			);
	}
	return (
		<Form
			type={onCloseModal ? "modal" : "regular"}
			onSubmit={handleSubmit(submit)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				{/* register your input into the hook by invoking the "register" function */}
				{/* why the ...? Because this will return an object { onChange, onBlur, customer, ref }, and by spreading we then add all these to the element [show dev tools] */}
				{/* include validation with required or other standard HTML validation rules: required, min, max, minLength, maxLength, pattern, validate */}
				{/* errors will return when field validation fails  */}
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Price should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "Cannot be empty, at least 0",
						validate: (value) =>
							getValues().regularPrice >= value ||
							"Discount should be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit Cabin" : "Create new Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
