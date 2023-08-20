import { ModalContainer, Modal } from "../../components/Modal/Modal";

import imageSubscribe from "../../assets/subscribeModalIMG.png";

import { Form, FormField } from "../../components/Form/Form";

import "./SubscribeModal.css";
import { Button } from "../../components/Button/Button";

export const SubscribeModal = ({ showModal }: any) => {
  const formSubscribe: FormField[] = [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      size: 50,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      size: 50,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
    },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      options: [
        {
          value: "female",
          label: "Female",
        },
        {
          value: "male",
          label: "Male",
        },
        {
          value: "other",
          label: "Other",
        },
      ],
    },
    {
      name: "acceptTerms",
      type: "checkbox",
      label: "Accept Terms and Conditions",
    },
  ];

  return (
    <ModalContainer ShowModal={showModal}>
      <Modal showModal={showModal} className={"SubscribeModal"}>
        <div className="imageContainer">
          <img src={imageSubscribe} alt="" />
        </div>
        <div className="formContainer">
          <h2>Subscribe to newsletter</h2>
          <Form
            fields={formSubscribe}
            onSubmit={(e) => e.preventDefault()}
            button={<Button text={"Subscribe"} onClick={() => null} fill={false} />}
            cancel={false}
          />
        </div>
      </Modal>
    </ModalContainer>
  );
};
