import React, { useState } from "react";

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	return (
		<div>
			<Button on onClick={() => setIsOpenModal((isOpen) => !isOpen)}>
				Add new Cabin
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateCabinForm
						onCloseModal={() => setIsOpenModal(false)}
					/>
				</Modal>
			)}
		</div>
	);
}

export default AddCabin;
