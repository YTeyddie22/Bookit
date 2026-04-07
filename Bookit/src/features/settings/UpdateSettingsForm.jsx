import React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();

	if (isLoading) return <Spinner />;
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={maxBookingLength}
				/>
			</FormRow>
			<FormRow label="Maxim guests/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={maxGuestPerBooking}
				/>
			</FormRow>
			<FormRow label="Breakfast Price">
				<Input
					type="number"
					id="min-nights"
					defaultValue={breakfastPrice}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
